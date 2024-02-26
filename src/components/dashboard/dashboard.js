import React, { useState } from 'react';
import { Container, Grid, Button, Card, Typography, CardActions, CardContent, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Dummy data for available files
  const availableFiles = [
    { name: 'DummyImage.jpg', type: 'image', url: 'https://via.placeholder.com/150' },
    { name: 'DummyImage_2.jpg', type: 'image', url: 'https://via.placeholder.com/151' },
    { name: 'DummyImage_3.jpg', type: 'image', url: 'https://via.placeholder.com/151' },
    { name: 'DummyPDF.pdf', type: 'pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  ];

  const handleUpload = (event) => {
    const uploadedFiles = event.target.files;
    setUploadedFiles([...uploadedFiles]);
    setUploadSuccess(true);
  };

  const handlePreview = (file) => {
    if (file) {
      setSelectedFile(file);
      setOpenPreview(true);
    }
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const renderFilePreview = () => {
    if (selectedFile) {
      if (selectedFile.type === 'image') {
        return <img src={selectedFile.url} alt={selectedFile.name} style={{ maxWidth: '100%', maxHeight: '80vh' }} />;
      } else if (selectedFile.type === 'pdf') {
        return <embed src={selectedFile.url} type="application/pdf" width="100%" height="100%" />;
      }
    }
    return null;
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '2.5rem',
    color: '#555',
    // fontWeight:'bold'
  };
  
  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="h3" style={headingStyle}>Dashboard</Typography>
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" style={{fontWeight:'bold'}}>
                Upload Files
              </Button>
            </label>
            {uploadSuccess && <p>File Successfully Uploaded!</p>}
          </Grid>
          <Grid item xs={12} style={{marginTop:'25px'}}>
            <Typography variant="h5" style={{color: '#555', marginBotton:'10px'}}>Available Files:</Typography>
            <Grid container spacing={3}>
              {availableFiles.map((file, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card>
                    <CardHeader title={file.name} />
                    {/* <CardContent>
                      {file.type === 'image' ? (
                        <img src={file.url} alt={file.name} style={{ maxWidth: '100%' }} />
                      ) : (
                        <div>PDF Thumbnail</div>
                      )}
                    </CardContent> */}
                    <CardActions>
                      <Button size="small" style={{fontWeight:'bold'}} onClick={() => handlePreview(file)}>Preview</Button>
                      <Button size="small" style={{fontWeight:'bold'}} >Download</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          {renderFilePreview()}
        </DialogContent>
        <DialogActions>
          <Button style={{fontWeight:'bold'}} onClick={handleClosePreview}>Close</Button>
          <Button style={{fontWeight:'bold'}}>Download</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
