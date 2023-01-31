import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import './AddProject.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../API/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { usersList } from '../API/usersList';

const AddProject = () => {
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectManager: '',
    projectAssignedTo: '',
    projectStatus: false,
    projectId: uuidv4(),
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.projectName !== '' &&
      formData.projectDescription !== '' &&
      formData.projectManager !== '' &&
      formData.assignedTo !== ''
    ) {
      await setDoc(doc(db, 'projects', formData.projectId), {
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        projectManager: formData.projectManager,
        projectAssignedTo: formData.projectAssignedTo,
        projectStatus: formData.projectStatus,
        projectId: formData.projectId,
        createdAt: serverTimestamp(),
      });

      setFormData({});

      navigate(`/edit/${formData.projectId}`);
    } else alert('Debes Completar todos los campos');
  };
  console.log(usersList);

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
              <p className='edit-project'>Add Project</p>
            </Link>
          </div>
        </div>
        <div className='separadorGrueso'></div>
        <Form className='mt-4 form' onSubmit={handleSubmit}>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Project Name</FormLabel>
            <FormControl
              className='mb-3 '
              type='text'
              placeholder='Enter text'
              value={formData.projectName}
              name='projectName'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Description</FormLabel>
            <FormControl
              className='mb-3'
              type='text'
              placeholder='Enter text'
              value={formData.projectDescription}
              name='projectDescription'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className='ms-3 me-3'>
            <FormLabel className='formLabel mb-1'>Project Manager</FormLabel>
            <Form.Select
              className='mb-3'
              name='projectManager'
              value={formData.projectManager}
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
              value={formData.projectAssignedTo}
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
              value={formData.projectStatus}
              onChange={handleChange}
            >
              <option>Enabled</option>
              <option>Disabled</option>
            </Form.Select>
          </FormGroup>
          <Button
            className='ms-3 me-3 btn'
            type='submit'
            style={{ backgroundColor: 'rgba(245, 34, 45, 1)', border: 'none' }}
          >
            Create Project
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddProject;
