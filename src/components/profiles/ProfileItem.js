import React from 'react'
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";

const ProfileItem = ({profile,chartData}) => {
    const data = [];

    let ans = chartData.reduce((agg,curr) => {
        let found = agg.find((x) => {
           return x.date === (curr.time).split(' ')[0]});
        if(found){
            found.data.push(curr);
        }
        else{
            agg.push({
                date : (curr.time).split(' ')[0],
                data : [curr]
            });
        }
        return agg;
     },[]);

    ans.forEach(i => {
        let d = {
            date: i.date,
            value: i.data.length
          }
          data.push(d);
    })

    // Date From All Data For Graph
    // let startDate = new Date(data[0].date)
    // let endDate = new Date(data[data.length-1].date)

    //Date for Graph From Given Static Image 
    let startDate = new Date("4/12/2013")
    let endDate = new Date("4/30/2013")

    const  numberWithCommas = (x)  => {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }
    return (
            <Card className="card-com bg-light">
            <List className="card-list">
                <ListItem>
                    <ListItemAvatar>
                    <Avatar alt={profile.Name} src={profile.avatar} />
                    </ListItemAvatar>
                    <ListItemText className="card-icon-text" primary={profile.Name} secondary={profile.occupation} />
                </ListItem>
            </List>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <ResponsiveContainer width="100%" height={140} id="container">
                        <LineChart
                        data={data}
                        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
                        >
                        <Line type="monotone" dataKey="value" stroke="#17a2b8" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>

                        <span className="graph-title">conversion {startDate.getDate()} / {startDate.getMonth() + 1} - {endDate.getDate()} / {endDate.getMonth() + 1}</span>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="card-data">
                            <span className="number">
                            {numberWithCommas(profile.Impression)}
                            </span><br/>
                            <span className="impression">
                            Impression
                            </span>
                        </div>
                        <div className="card-data">
                            <span className="number conversion">
                            {numberWithCommas(profile.Conversion)}
                            </span><br/>
                            <span className="impression">
                            Conversion
                            </span>
                        </div>
                        <div className="card-data">
                            <span className="number revenue">
                              $ {numberWithCommas((profile.revenue).toFixed(2))}
                            </span><br/>
                        </div>
                    </Grid>
                </Grid>
            </Card>
    )
}

export default ProfileItem
