import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {changePage, clickRow, closeModal, clickWriteButton, modifyData, keywordSearch, changeShowAllContents, searchTypeSelectorChange} from "./board/action";
import Board from "./Board";
import ContentsModal from "./ContentsModal";
import {deleteOne, post} from "./boardApi";
import Topbar from "./Topbar";
import {useHistory} from "react-router-dom";

const BoardContainer = ({pageNumber, pageSize, selectedData, isModalOpen, modalData, accountId, role, isWriteModal, isSearch, keyword, boardId, searchType, isRequestFail, errorCode, errorMessage,
                            changePage, clickRow, closeModal, clickWriteButton, modifyData, keywordSearch, changeShowAllContents, searchTypeSelectorChange}) => {

    const history = useHistory();

    useEffect(() => {
        if(accountId == null){
            history.push("/");
        }
        changePage(pageNumber, pageSize);
    }, [])

    const columns = [
        {title: '제목', field: 'title'},
        {title: '작성자', field: 'writer.accountId'},
        {title: '작성일시', field: 'createdAt'},
    ]

    const handleChangePageNumber = (pageNumber) => {
        changePage(pageNumber, pageSize, searchType, keyword, isSearch);
    };

    const handleChangePageSize = (pageSize) => {
        changePage(pageNumber, pageSize, searchType, keyword, isSearch);
    };

    const handleModify = (updatedData) => {
        modifyData(modalData.id, updatedData, selectedData.slice(0));
        closeModal();
    }

    const handleDelete = () => {
        deleteOne(modalData.id)
            .then(response => {
                changePage(pageNumber, pageSize);
                closeModal();
            });
    }

    const handleWrite = (writeData) => {
        post(writeData)
            .then(response => {
                changePage(0, pageSize);
                closeModal();
            })
    }

    return (
        <div>
            <Topbar
                title="게시판"
                accountId={accountId}
            />
            <Board
                key={boardId}
                pageNumber={pageNumber}
                pageSize={pageSize}
                searchType={searchType}
                handleChangeSearchTypeSelect={searchTypeSelectorChange}
                keywordInStore={keyword}
                handleChangePageNumber={handleChangePageNumber}
                handleChangePageSize={handleChangePageSize}
                handleWriteButtonClick={clickWriteButton}
                handleRowClick={clickRow}
                handleSearch={keywordSearch}
                handleShowAllContentsButton={changeShowAllContents}
                columns={columns}
                selectedData={selectedData}
                accountId={accountId}
                isRequestFail={isRequestFail}
                errorCode={errorCode}
                errorMessage={errorMessage}
            />
            { isModalOpen ?
            <ContentsModal
                userLoggedIn={accountId}
                userRoleLoggedIn={role}
                isModalOpen={isModalOpen}
                modalData={modalData}
                isSearch={isSearch}
                keyword={keyword}
                handleClose={closeModal}
                handleDelete={handleDelete}
                handleSave={isWriteModal? handleWrite : handleModify}
                isWriteModal={isWriteModal}
            />
            : null}
        </div>
    );
}

const mapStateToProps = state => ({
    pageNumber : state.board.pageNumber,
    pageSize : state.board.pageSize,
    selectedData : state.board.selectedData,
    isModalOpen: state.board.isModalOpen,
    modalData: state.board.modalData,
    accountId: state.main.accountId,
    role: state.main.role,
    isWriteModal: state.board.isWriteModal,
    isSearch: state.board.isSearch,
    keyword: state.board.keyword,
    boardId: state.board.boardId,
    searchType: state.board.searchType,
    isRequestFail: state.board.isRequestFail,
    errorCode: state.board.errorCode,
    errorMessage: state.board.errorMessage,
})

const mapDispatchToProps = dispatch => ({
    changePage : (pageNumber, pageSize, searchType, keyword, isSearch) => dispatch(changePage(pageNumber, pageSize, searchType, keyword, isSearch)),
    clickRow: (rowData) => dispatch(clickRow(rowData)),
    closeModal: () => dispatch(closeModal()),
    clickWriteButton: () => dispatch(clickWriteButton()),
    modifyData: (id, updatedData, allData) => dispatch(modifyData(id, updatedData, allData)),
    changeShowAllContents: (pageSize) => dispatch(changeShowAllContents(pageSize)),
    keywordSearch: (pageSize, searchType, keyword) => dispatch(keywordSearch(pageSize, searchType, keyword)),
    searchTypeSelectorChange: (value) => dispatch(searchTypeSelectorChange(value)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardContainer)
