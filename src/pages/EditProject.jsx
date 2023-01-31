import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../API/firebase';
import { Link, useParams } from 'react-router-dom';
import { uuidv4 } from '@firebase/util';
import './EditProject.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usersList } from '../API/usersList';

const EditProject = () => {
  //Estado para almacenar la coleccion de proyectos, comienza como un array vacio, se actualiza con el array fetchedProjects
  const [projects, setProjects] = useState([]);
  const [disabledInputs, setDisabledInputs] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const [valueState, setValueState] = useState(true);
  const [newFormatData, setNewFormatData] = useState({});
  const { id } = useParams();

  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectManager: '',
    projectAssignedTo: '',
    projectStatus: false,
    projectId: uuidv4(),
  });

  const handleEdit = (event) => {
    event.preventDefault();

    setDisabledInputs(false);
    setButtonState(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setValueState(false);
  };
  useEffect(() => {
    //Funcion asincrona, dentro el codigo para obtener todos los documentos de la coleccion de firebase.
    async function fetchData() {
      const projectRef = doc(db, 'projects', id);
      const project = await getDoc(projectRef);
      setFormData(project.data());

      setValueState(false);
    }
    //Ejecuto la funcion fetchData
    fetchData();
  }, [id]);

  const handleSave = async (event) => {
    const projectRef = doc(db, 'projects', formData.projectId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(projectRef, {
      projectAssignedTo: formData.projectAssignedTo,
      projectDescription: formData.projectDescription,
      projectManager: formData.projectManager,
      projectName: formData.projectName,
      projectStatus: formData.projectStatus,
      projectId: formData.projectId,
    });

    setDisabledInputs(true);

    setButtonState(true);
  };
  return (
    <>
      <div className='projectsContainer' key={formData.projectId}>
        <div className='nav-text'>
          <Link to='/'>
            <FontAwesomeIcon
              className='arrow'
              style={{ fontSize: '20px' }}
              icon={faArrowLeft}
            />
          </Link>

          <div className='text-nav'>
            <Link
              className='back-text'
              style={{ textDecoration: 'none' }}
              to='/'
            >
              <p>Back</p>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='/'>
              <p className='edit-project'>Edit Project</p>
            </Link>
          </div>
        </div>
        <div className='separadorGrueso'></div>
        <Form className='mt-4 form'>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Project Name</FormLabel>
            <FormControl
              className='mb-3 '
              type='text'
              placeholder='Enter text'
              value={
                valueState ? newFormatData.projectName : formData.projectName
              }
              name='projectName'
              disabled={disabledInputs}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Description</FormLabel>
            <FormControl
              className='mb-3'
              type='text'
              placeholder='Enter text'
              /* value={projects.projectDescription} */
              value={
                valueState
                  ? newFormatData.projectDescription
                  : formData.projectDescription
              }
              name='projectDescription'
              disabled={disabledInputs}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Project Manager</FormLabel>
            <Form.Select
              className='mb-3'
              name='projectManager'
              /*  value={projects.projectManager} */
              value={
                valueState ? projects.projectManager : formData.projectManager
              }
              disabled={disabledInputs}
              onChange={handleChange}
            >
              <option value='' disabled selected>
                Select a person
              </option>
              {usersList.map((user) => (
                <option key={user.id}>{user.name}</option>
              ))}
            </Form.Select>
          </FormGroup>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Assigned To</FormLabel>
            <Form.Select
              className='mb-3'
              name='projectAssignedTo'
              /* value={projects.projectAssignedTo} */
              value={
                valueState
                  ? projects.projectAssignedTo
                  : formData.projectAssignedTo
              }
              disabled={disabledInputs}
              onChange={handleChange}
            >
              <option value='' disabled selected>
                Select a person
              </option>
              {usersList.map((user) => (
                <option key={user.id}>{user.name}</option>
              ))}
            </Form.Select>
          </FormGroup>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Status</FormLabel>
            <Form.Select
              name='projectStatus'
              /* value={projects.projectStatus} */
              value={
                valueState ? projects.projectStatus : formData.projectStatus
              }
              disabled={disabledInputs}
              onChange={handleChange}
            >
              <option>Enabled</option>
              <option>Disabled</option>
            </Form.Select>
          </FormGroup>
          {buttonState ? (
            <Button
              className='ms-3 me-3'
              type='submit'
              style={{ backgroundColor: '#f5222d' }}
              onClick={handleEdit}
            >
              Edit Project
            </Button>
          ) : (
            <Button
              className='ms-3 me-3 btn'
              style={{
                backgroundColor: 'rgba(245, 34, 45, 1)',
                border: 'none',
              }}
              onClick={handleSave}
            >
              Save Project
            </Button>
          )}
        </Form>
      </div>
    </>
  );
};

export default EditProject;
