import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { db } from '../API/firebase';
import './ProjectList.css';
import { usersList } from '../API/usersList';

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faTrash,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const ProjectList = () => {
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (index) => {
    setShowMenu(showMenu === index ? null : index);
  };
  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    const updatedData = data.filter((project) => project.projectId !== id);
    setData(updatedData);
  };

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, 'projects'), orderBy('createdAt'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push(doc.data());

          setData(projects);
          let timestamp = doc.data().createdAt;
        });
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='full-container'>
        <div className='nav-text'>
          <Link className='link' to='/'>
            <p className='add-project-text'>My Projects</p>
          </Link>
          <Button
            className='ms-3 me-3 btn add-project-button'
            style={{ backgroundColor: 'rgba(245, 34, 45, 1)', border: 'none' }}
            onClick={() => {
              navigate('/create');
            }}
          >
            <p style={{ fontSize: '12px' }}>+ Add Project</p>
          </Button>
        </div>
        <div className='card-project-container'>
          {data.map((project, index) => (
            <div className='project-card' key={project.projectId}>
              <div className='project-data'>
                <h5 className='project-name'>{project.projectName}</h5>

                <FontAwesomeIcon
                  className='menu-icon'
                  icon={faEllipsisVertical}
                  onClick={() => handleMenu(index)}
                  style={{ cursor: 'pointer' }}
                />

                {showMenu === index && (
                  <ul
                    style={{
                      position: 'absolute',
                      backgroundColor: 'white',
                      border: '1px solid black',
                    }}
                    className='menu-options'
                  >
                    <Link className='link' to={`/edit/${project.projectId}`}>
                      <li className='menu-text edit-text'>
                        <FontAwesomeIcon
                          className='edit-icon'
                          icon={faPenToSquare}
                          style={{ cursor: 'pointer' }}
                        />
                        Edit
                      </li>
                    </Link>
                    <hr className='line-menu' />
                    <li
                      onClick={() => deleteDocument(project.projectId)}
                      className='menu-text delete-text'
                    >
                      <FontAwesomeIcon className='trash-icon' icon={faTrash} />
                      Delete
                    </li>
                  </ul>
                )}
                <div>
                  <p className='project-datestamp'>
                    {`${project.createdAt.toDate().getDate().toString()}/${
                      project.createdAt.toDate().getMonth() + (1).toString()
                    }/${project.createdAt.toDate().getFullYear().toString()}`}
                  </p>
                  <p className='project-hourstamp'>
                    {`${project.createdAt
                      .toDate()
                      .getHours()
                      .toString()}: ${project.createdAt
                      .toDate()
                      .getMinutes()
                      .toString()}${
                      project.createdAt.toDate().getHours() < 12 ? 'AM' : 'PM'
                    }`}
                  </p>
                </div>
                <p className='name'>{project.projectAssignedTo}</p>
                {
                  <img
                    className='user-pic'
                    src={
                      usersList.find(
                        (user) => user.name === project.projectAssignedTo
                      )?.pictureURL
                    }
                  />
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
