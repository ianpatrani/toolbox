import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Form, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { setFilesData, setLoading } from './actions';

const App = () => {
  const dispatch = useDispatch();
  let filesData = useSelector(state => state.filesData);
  const loading = useSelector(state => state.loading);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const filesNames = await axios.get('http://localhost:3001/files/list');
         filesData = await Promise.all(
          filesNames.data.files.map(async (fileName) => {
            try {
              const fileData = await axios.get(`http://localhost:3001/files/data?fileName=${fileName}`);
              return fileData.data;
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );
        dispatch(setFilesData(filesData.filter(data => data !== null)));
        setFilteredData(filesData.filter(data => data !== null));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSearch = () => {
    const fetchFilteredData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`http://localhost:3001/files/list`);
        const filteredFile = response.data.files.find(file =>
          file.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredFile) {
          const fileData = await axios.get(`http://localhost:3001/files/data?fileName=${filteredFile}`);
          dispatch(setFilesData([{ file: filteredFile, lines: fileData.data.lines }]));
          setFilteredData([{ file: filteredFile, lines: fileData.data.lines }]);
        } else {
          setFilteredData([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFilteredData();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>File data table</h1>
      {filteredData.length === 0 ? (
        <>
          <p>No data</p>
          <Button variant="primary" onClick={() => window.location.reload()}>Refresh</Button>
        </>
      ) : (
        <>
          <Form className="mb-3" inline>
            <Form.Control
              type="text"
              placeholder="Search by file name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-sm-2"
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
            <Button variant="primary" onClick={() => window.location.reload()}>Refresh</Button>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>File name</th>
                <th>Text</th>
                <th>Number</th>
                <th>Hexa</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(({ file, lines }, fileIndex) =>
                lines.map((line, index) => (
                  <tr key={`${fileIndex}-${index}`}>
                    <td>{file}</td>
                    <td>{line.text}</td>
                    <td>{line.number}</td>
                    <td>{line.hex}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default App;