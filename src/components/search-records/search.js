import React, { useState } from 'react';
import { TextField, Typography, Container, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';

// Dummy data
const userData = [
  { username: 'faisalwaris01', files: ['image1.jpg', 'image2.jpg', 'document1.pdf'] },
  { username: 'john_doe', files: ['document2.pdf', 'image3.jpg'] },
  // Add more dummy data as needed
];

function SearchRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedUser(null); // Reset selected user when searching
  };

  const handleUserSelect = (username) => {
    setSelectedUser(username);
  };

  const handlePreviewOpen = (file) => {
    setSelectedFile(file);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setSelectedFile(null);
    setPreviewOpen(false);
  };

  const filteredUsers = searchTerm.trim() !== '' && userData.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography style={{ marginTop: '20px', color: '#555' }} variant="h4" align="center" gutterBottom>
        Search Records
      </Typography>
      <TextField
        label="Search Username"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      {filteredUsers && filteredUsers.length > 0 && (
        <Grid container spacing={2}>
          {filteredUsers.map((user, index) => (
            <Grid item xs={12} key={index}>
              <Card onClick={() => handleUserSelect(user.username)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant="h6">{user.username}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedUser && (
        <div style={{ marginTop: '20px' }}>
          <Typography style={{ color: '#555' }} variant="h5" gutterBottom>
            Files for {selectedUser}:
          </Typography>
          <Grid container spacing={2}>
            {userData.find(user => user.username === selectedUser).files.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Typography variant="h6">{file}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px', fontWeight: 'bold' }}
                    onClick={() => handlePreviewOpen(file)}
                  >
                    Preview
                  </Button>
                  <Button variant="contained" color="secondary" style={{ marginTop: '10px', marginLeft: '10px',  fontWeight: 'bold' }}>
                    Download
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      <Dialog open={previewOpen} onClose={handlePreviewClose} fullWidth maxWidth="md">
        <DialogTitle>{selectedFile}</DialogTitle>
        <DialogContent>
          {/* Depending on the file type, render preview */}
          {selectedFile && (selectedFile.endsWith('.jpg') || selectedFile.endsWith('.jpeg')) && (
            <img src={selectedFile} alt="Preview" style={{ maxWidth: '100%' }} />
          )}
          {selectedFile && selectedFile.endsWith('.pdf') && (
            <iframe
              src={`https://docs.google.com/viewer?url=${selectedFile}&embedded=true`}
              title="Preview"
              width="100%"
              height="500px"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button style={{ fontWeight: 'bold' }} onClick={handlePreviewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SearchRecords;
