import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ededed"
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    programImage: {
        maxWidth: "100%",
        height: "auto",
        padding: 10
    },
    programCard: {
        display: "flex",
        padding: 10
    },
    programCard_responsive: {
        padding: 10
    },
    filterCard: {
        padding: 10,
    },
    filterCard_responsive: {
        padding: 0
    }
}));

const _filters = [
    { title: 'Launch Year', type: 'launch_year', filter_color: [], value: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'] },
    { title: 'Successful Launch', type: 'launch_success', filter_color: [], value: ['true', 'false'] },
    { title: 'Successful Landing', type: 'land_success', filter_color: [], value: ['true', 'false'] }
]

const LaunchPrograms = ({ all_programs, applyFilter }) => {
    const router = useRouter()
    const classes = useStyles();
    const [width, setWidth] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [filters, setFilters] = useState(_filters);
    const [selectedFilters, setSelectedFilters] = useState([]);
    let buttonSize = "medium";
    let programCard = classes.programCard;
    let filterCard = classes.filterCard;

    useEffect(() => {
        if (all_programs) {
            setPrograms(all_programs)
        }
    }, [all_programs]);

    useEffect(() => {
        if (window) {
            setWidth(window.innerHeight);
        }
    }, [])

    if (width < 700) {
        programCard = classes.programCard_responsive;
    }
    if (width < 1024) {
        buttonSize = "small";
    }
    if (width >= 1024 && width < 1440) {
        filterCard = classes.filterCard_responsive;
    }

    useEffect(() => {
        if (filters) {
            let filter = filters;
            for (let i = 0; i < filter.length; i++) {
                for (let j = 0; j < filter[i].value.length; j++) {
                    filter[i]['filter_color'].push('#a2cf6e');
                }
            }
            setFilters(filter);
        }
    }, [filters])

    const handleFilter = (type, value, index, index1) => {

        let _selectedFilters = [...selectedFilters];
        let alreadyExists = false;
        let filter = [...filters];

        for (let i = 0; i < filter[index]['filter_color'].length; i++) {
            filter[index]['filter_color'][i] = '#a2cf6e';
        }

        for (let i = 0; i < _selectedFilters.length; i++) {
            if (_selectedFilters[i].value == value && _selectedFilters[i].type == type) {
                alreadyExists = true;
                _selectedFilters.splice(i, 1);
                break;
            }
            else if (_selectedFilters[i].value != value && _selectedFilters[i].type == type) {
                _selectedFilters.splice(i, 1);
            }
        }
        if (!alreadyExists) {
            _selectedFilters.push({ type: type, value: value });
            filter[index]['filter_color'][index1] = "#618833";
        }
        let str = "";
        for(let i=0;i<_selectedFilters.length;i++){
            if(i > 0){
                str=str+'&';
            }
            str=str+(_selectedFilters[i]["type"] + "="+_selectedFilters[i]["value"]);
        }
        console.log("str",str)
        console.log("_selectedFilters",_selectedFilters)
        router.push('/?'+str, undefined, { shallow: true })
        setFilters(filter);
        setSelectedFilters(_selectedFilters);
        applyFilter(_selectedFilters);
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        SpaceX Launch Program
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Grid container style={{ display: 'flex' }} >
                        <Grid item xs={12} md={2} sm={6} className={filterCard}>
                            <Paper className={classes.paper}>
                                <Typography variant="subtitle2">
                                    Filters
                            </Typography>
                                {filters && filters.length > 0 && filters.map((filter, index) => (
                                    <React.Fragment key={filter.type}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <span>{filter.title}</span>
                                        </div>
                                        <hr style={{ width: '50%' }} />
                                        <Grid container style={{ display: 'flex', textAlign: 'center' }}>
                                            {filter.value && filter.value.length > 0 && filter.value.map((value, index1) => (
                                                <Grid item xs={6} md={6} key={value}>
                                                    <Button size={buttonSize} onClick={() => handleFilter(filter.type, value, index, index1)} key={value} variant="contained" style={{ margin: 10, backgroundColor: filter.filter_color[index1] }}>
                                                        {value}
                                                    </Button>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={10} sm={6} >
                            <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {programs && programs.length > 0 && programs.map(program => (
                                    <Grid key={program.flight_number} item md={3} xs={12} sm={6} className={programCard}>
                                        <Paper className={classes.paper}>
                                            <div style={{ backgroundColor: '#ededed', textAlign: 'center' }}>
                                                <img src={program.links.mission_patch_small} className={classes.programImage} />
                                            </div>
                                            <Typography variant="subtitle2" style={{ padding: 10, color: '#002884' }}>
                                                {program.mission_name} # {program.flight_number}
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }} >
                                                Mission Ids:
                                                {program.mission_id && program.mission_id.length > 0 && (
                                                    <ul>
                                                        {program.mission_id.map((missionId) => (
                                                            <li key={missionId} style={{ color: '#757ce8' }}>{missionId}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }}>
                                                Launch Year: <span style={{ color: '#757ce8' }}>{program.launch_year}</span>
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }}>
                                                Successful Launch: <span style={{ color: '#757ce8' }}>{program.launch_success ? program.launch_success.toString() : null}</span>
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ padding: 10 }}>
                                                Successful Landing: <span style={{ color: '#757ce8' }}>{program.launch_landing}</span>
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default LaunchPrograms;