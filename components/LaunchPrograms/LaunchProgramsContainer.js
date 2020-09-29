import React, { useEffect } from 'react';
import LaunchPrograms from './LaunchPrograms';
import get_programs from './redux/index';
import { useSelector, useDispatch } from 'react-redux'

const LaunchProgramsContainer = ()=>{
    const dispatch = useDispatch();
    const all_programs = useSelector(state=>state.launchPrograms.allPrograms)

    useEffect(()=>{
        dispatch(get_programs.get_programs());
    },[])


    const applyFilter = (filters)=>{
        dispatch(get_programs.get_programs(filters));
    }

    const props = {all_programs,applyFilter};
    return <LaunchPrograms {...props}/>
}

export default  LaunchProgramsContainer;