import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Modal, TextField, Typography, Grid} from '@material-ui/core';
import {isAdminRole} from './specification';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function ContentsModal({isModalOpen, modalData, userLoggedIn, userRoleLoggedIn, isWriteModal, handleClose, handleSave, handleDelete}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [isModify, setIsModify] = useState(false);
    const [title, setTitle] = useState(modalData.title);
    const [contents, setContents] = useState(modalData.contents);

    const combineData = () => {
        return {
            title: title,
            contents: contents
        }
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={(event) => {
                        event.preventDefault();
                        handleSave(combineData());
                    }}>
                        {(isWriteModal || isModify) ?
                            <div>
                                <TextField
                                    id="outlined-full-width"
                                    label="제목"
                                    placeholder="제목을 입력하세요."
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    defaultValue={modalData.title}
                                    margin="normal"
                                    onChange={event => setTitle(event.target.value)}
                                    required
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="내용"
                                    placeholder="내용을 입력하세요."
                                    fullWidth
                                    multiline
                                    rows={4}
                                    defaultValue={modalData.contents}
                                    variant="outlined"
                                    margin="normal"
                                    onChange={event => setContents(event.target.value)}
                                    required
                                />
                            </div>
                            :
                            <div>
                                <h2 id="simple-modal-title">{modalData.title}</h2>
                                <Typography variant="body1" gutterBottom>{modalData.contents}</Typography>
                            </div>
                        }
                        <hr/>
                        {isWriteModal ?
                            <div>
                                <ModalContentsWriter writer={userLoggedIn}/>
                                <Grid container>
                                    <Button type="submit" color="primary" className={classes.submit}>Save</Button>
                                    <Button onClick={() => {
                                        setIsModify(false);
                                        handleClose();
                                    }}>Close</Button>
                                </Grid>
                            </div>
                            :
                            <div>
                                <ModalContentsWriter writer={modalData.writer}/>
                                <Typography variant="body2" gutterBottom>작성일 : {modalData.createdAt}</Typography>
                                <Grid container>
                                    {isModify ?
                                        <Grid>
                                            <Button type="submit" color="primary"
                                                    className={classes.submit}>Save</Button>
                                            <Button onClick={() => setIsModify(false)}>Back</Button>
                                        </Grid>
                                        :
                                        <ModalButtons
                                            setIsModify={setIsModify}
                                            handleDelete={handleDelete}
                                            writer={modalData.writer}
                                            userLoggedIn={userLoggedIn}
                                            userRoleLoggedIn={userRoleLoggedIn}
                                        />
                                    }
                                    <Button onClick={() => {
                                        setIsModify(false);
                                        handleClose();
                                    }}>Close</Button>
                                </Grid>
                            </div>
                        }
                    </form>
                </div>
            </Modal>
        </div>
    );
}


function ModalButtons({writer, userLoggedIn, setIsModify, handleDelete, userRoleLoggedIn}) {
    return (
        <span>
            <Grid>
            {writer.accountId == userLoggedIn ? <Button color="primary" onClick={() => setIsModify(true)}>Modify</Button> : null}
            {isAdminRole(userRoleLoggedIn) || writer.accountId == userLoggedIn ? <Button color="secondary" onClick={() => handleDelete()}>Delete</Button> : null}
            </Grid>
        </span>
    );
}

function ModalContentsWriter({writer}) {
    if (typeof writer == 'object') {
        writer = writer.accountId
    }
    return (
        <Typography variant="body2" gutterBottom>작성자 : {writer}</Typography>
    );
}

