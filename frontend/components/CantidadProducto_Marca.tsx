'use client'
import { getCantidadProducto_Marca } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import {  Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CountCantidadMarca() {

    const [chartData, setChartData] = useState({
        labels:[],
        datasets:[
            {
                label:'',
                data:[],
                fill: false,
                backgroundColor:[] as string[]
            }
        ]
      })
    
      useEffect(()=>{
        getCantidadProducto_Marca().then(data=>{
            const  labels = data.map((item:any) => item.brandCode);
            const total = data.map((item:any) => item.total_count);
            
            setChartData({
                labels:labels,
                datasets:[{
                    label: 'cantidad de productos por marca',
                    data:total,
                    fill:false,
                    backgroundColor:['rgb(50, 25, 241)','rgb(255, 99, 132)','rgb(230, 193, 132)','rgb(150, 25, 141)','rgb(50, 225, 141)' ]
                }
                ]
            })
    
        })
        .catch((error)=>{console.log('ocurrio un error',error)})
      },[]);
 
  return (
    <>

    <div>
        {
            chartData ? (
                <div style={{"height":'400px'}}>
                    <h3>Titulo del componente</h3>
                    <Pie data={chartData}/>
                </div>
            ) :(
                <div> loading..</div>
            )
        }
    </div>
        
    </>
  )
}