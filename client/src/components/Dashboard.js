import React from 'react'
import Navbar from './Navbar';
import './Dashboard.css';
import GenreCountPie from './GenreCountPie';
import BasicBar from './BAsicBar';
import TopStudents from './TopStudents';
import BookLevelCheckoutsLineChart from './BookLevelCheckoutsLineChart';
import TopBooksList from './TopBooksList';

function Dashboard() {
  return (
    <div>
        <Navbar/>
        <div className="grid-container">
        <div className="item1"> <GenreCountPie/></div>
        <div className="item2"><BasicBar/></div>
        <div className='item3'><TopStudents/></div>
        <div className='item4'><BookLevelCheckoutsLineChart/></div>
        <div className='item5'><TopBooksList/></div>
        </div>
    </div>
  )
}

export default Dashboard