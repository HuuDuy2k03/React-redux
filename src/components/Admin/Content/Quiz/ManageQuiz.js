  import './ManageQuiz.scss';
  import Select from 'react-select';
  import { useState } from 'react';
  import {postCreateNewQuiz} from '../../../../services/apiService';
  import { toast } from 'react-toastify';
  import TableQuiz from './TableQuiz';
  import { Accordion } from 'react-bootstrap';
  import QuizQA from './QuizQA';
  import AssignQuiz from './AssignQuiz';

  const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
  ];

  const ManageQuiz = () => {

      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [type, setType] = useState(options[0]);
      const [image, setImage] = useState(null);

      const [reload, setReload] = useState(false);

      const handleChangeFile = (event) => {
          if (event.target && event.target.files && event.target.files[0]) {
              setImage(event.target.files[0]);
          }
      };

      const handleSubmitQuiz = async () => {
        // validate
        if(!name || !description) {
          toast.error("Please fill in all fields");
          return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if(res && res.EC === 0) {
          toast.success(res.EM);
          setName('');
          setDescription('');
          setType(options[0]);
          setImage(null);

          setReload(!reload);
        }else {
          toast.error(res.EM);
        }
      };

    return (
      <div className="quiz-container">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Manager Quiz</Accordion.Header>
            <Accordion.Body>
              <div className="new-quiz">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder='Quiz Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder='Quiz Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label>Description</label>
                    </div> 
                    <div className='my-3'><Select defaultValue={type} onChange={setType} options={options} placeholder="Select Type"  /></div>
                    <div className="more-action">
                        <label className='form-label'> Upload File</label>
                        <input type="file" className="form-control" onChange={(e) => handleChangeFile(e)} />
                    </div>
                    <div className='mt-3'>
                      <button onClick={() => handleSubmitQuiz()} className="btn btn-primary ">Save</button>
                    </div>
                </fieldset>
              </div>
              <div className="list-detail">
                <TableQuiz fetchTrigger={reload} />
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>update Q/A Quiz</Accordion.Header>
            <Accordion.Body>
              <QuizQA/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Assign to Users</Accordion.Header>
            <Accordion.Body>
              <AssignQuiz/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        
      </div>
    );
  };

  export default ManageQuiz;