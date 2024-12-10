'use client'
import { getValorTotal_categoria } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import {  Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ValorPcategoria() {

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
        getValorTotal_categoria ().then(data=>{
            const  labels = data.map((item:any) => item.categoryCode);
            const total = data.map((item:any) => item.Salario_Total);
            
            setChartData({
                labels:labels,
                datasets:[{
                    label: 'Valor total por categoria',
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
                    <Doughnut data={chartData}/>
                </div>
            ) :(
                <div> loading..</div>
            )
        }
    </div>
        
    </>
  )
}