import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
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
  const [dataFetched, setDataFetched] = useState(false);
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectManager: '',
    projectAssignedTo: '',
    projectStatus: false,
    projectId: uuidv4(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabledInputs(false);
    setButtonState(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    await setDoc(doc(db, 'projects', formData.projectId), {
      projectName: formData.projectName,
      projectDescription: formData.projectDescription,
      projectManager: formData.projectManager,
      projectAssignedTo: formData.projectAssignedTo,
      projectStatus: formData.projectStatus,
      projectId: formData.projectId,
    });
    setDisabledInputs(true);

    setButtonState(true);
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setValueState(false);
  };

  useEffect(() => {
    //Funcion asincrona, dentro el codigo para obtener todos los documentos de la coleccion de firebase.
    async function fetchData() {
      const docRef = doc(db, 'projects', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProjects(docSnap.data());
        console.log(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }
    //Ejecuto la funcion fetchData
    fetchData();
  }, []);
  console.log(projects);
  return (
    <>
      <div className='projectsContainer' key={projects.projectId}>
        <div className='nav-text container'>
          <Link to='/'>
            <FontAwesomeIcon className='arrow' icon={faArrowLeft} />
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/'>
            <p className='add-project-text'>
              <p
                style={{
                  marginLeft: '-24rem',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '12px',
                  marginTop: '0.3rem',
                }}
              >
                Back
              </p>
              <p style={{ marginTop: '-2.3rem', marginLeft: '-16rem' }}>
                Project List
              </p>
            </p>
          </Link>
        </div>
        <div className='separadorGrueso'></div>
        <Form className='mt-4 form' onSubmit={handleSubmit}>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Project Name</FormLabel>
            <FormControl
              className='mb-3 '
              type='text'
              placeholder='Enter text'
              value={valueState ? projects.projectName : formData.projectName}
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
              value={projects.projectDescription}
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
              value={projects.projectManager}
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
              value={projects.projectAssignedTo}
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
              value={projects.projectStatus}
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
            >
              Edit Project
            </Button>
          ) : (
            <Button
              className='ms-3 me-3'
              type='submit'
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
