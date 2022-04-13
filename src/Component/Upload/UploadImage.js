import { useState } from 'react';
// import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@mui/material';
import UploadService from './UploadService';
import AddPhotoAlternateIcon from '@mui/icons-material/AddAPhotoRounded';
import { Fab } from '@mui/material';

// const BorderLinearProgress = withStyles((theme) => ({
//   root: {
//     height: 15,
//     borderRadius: 5,
//   },
//   colorPrimary: {
//     backgroundColor: '#EEEEEE',
//   },
//   bar: {
//     borderRadius: 5,
//     backgroundColor: '#1a90ff',
//   },
// }))(LinearProgress);

export default function UploadImage() {
  const [state, setState] = useState({
    currentFile: undefined,
    previewImage: undefined,
    progress: 0,
    message: '',
    imageInfos: [],
  });

  function selectFile(event) {
    setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: '',
    });
  }

  function upload() {
    setState({
      progress: 0,
    });
    UploadService.upload(state.currentFile, (event) => {
      setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        setState({
          message: response.data.message,
        });
        // return UploadService.getFiles();
      })
      .then((files) => {
        setState({
          imageInfos: files.data,
        });
      })
      .catch((err) => {
        setState({
          progress: 0,
          message: 'Could not upload the image!',
          currentFile: undefined,
        });
      });
  }

  const handleUploadClick = (event) => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      mainState: 'uploaded',
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  const { currentFile, previewImage, progress, message, imageInfos, isError } =
    state;

  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile}
        />
        <Button className="btn-choose" variant="outlined" component="span">
          Choose Image
        </Button>
        <Fab component="span">
          <AddPhotoAlternateIcon />
        </Fab>
      </label>
      <div className="file-name">{currentFile ? currentFile.name : null}</div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!currentFile}
        onClick={upload}
      >
        Upload
      </Button>
      {currentFile && (
        <Box className="my20" display="flex" alignItems="center">
          {/* <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box> */}
          <Box minWidth={35}>
            <Typography
              variant="body2"
              color="textSecondary"
            >{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}
      {previewImage && (
        <div>
          <img className="preview my20" src={previewImage} alt="" />
        </div>
      )}
      {message && (
        <Typography
          variant="subtitle2"
          className={`upload-message ${isError ? 'error' : ''}`}
        >
          {message}
        </Typography>
      )}
      <Typography variant="h6" className="list-header">
        List of Images
      </Typography>
      <ul className="list-group">
        {imageInfos &&
          imageInfos.map((image, index) => (
            <ListItem divider key={index}>
              <img
                src={image.url}
                alt={image.name}
                height="80px"
                className="mr20"
              />
              <a href={image.url}>{image.name}</a>
            </ListItem>
          ))}
      </ul>
    </div>
  );
}
