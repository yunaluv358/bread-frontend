import React, {Component, useEffect, useState} from 'react';
import  _Pagination from './_Pagination';
import { _Paginate } from './_Paginate';

export const _BreadPage = () => {
    const [movies, setMovies] = useState([])
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(1)

    const movieList = [
        { id: 0, title: "기생충", genre: "블랙 코미디", release: "2019-05-30" },
        { id: 1, title: "라이온 킹", genre: "애니메이션", release: "2019-07-17" },
        { id: 2, title: "날씨의 아이", genre: "애니메이션", release: "2019-10-31" },
        { id: 3, title: "알라딘", genre: "판타지", release: "2019-05-23" },
        { id: 4, title: "나랏말싸미", genre: "역사", release: "2019-07-24" },
        { id: 5, title: "주전장", genre: "역사", release: "2019-07-25" },
        { id: 6, title: "어벤져스: 엔드게임", genre: "판타지", release: "2019-04-24" },
        { id: 7, title: "봉오동 전투", genre: "역사", release: "2019-08-07" },
        { id: 8, title: "김복동", genre: "역사", release: "2019-08-08" },
        { id: 9, title: "코코", genre: "애니메이션", release: "2018-01-11" },
    ]

    useEffect(() => {
        setMovies(movieList)
        setPageSize(5)
        setCurrentPage(1)
    },[])

    const handlePageChange = (page) => {
        setCurrentPage(page); // 페이지 수 클릭 시 현재 페이지 변경
    }

    const countHandler = e => {
        if (count === 0)
            return <p>There are no movies in the database.</p>
    }

       const submovies = _Paginate(movies, currentPage, pageSize);

        return <>
        <p>showing {count} movies in the database.</p>

        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Release</th>
            </tr>
            </thead>
            <tbody>
            {submovies.map(movie =>
                <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.release}</td>
                </tr>
            )}
            </tbody>
        </table>

        <_Pagination
            pageSize={pageSize}
            itemsCount={movies.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />
    </>
}

export default _BreadPage