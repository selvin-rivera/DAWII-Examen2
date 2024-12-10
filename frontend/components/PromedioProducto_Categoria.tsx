'use client'
import { getPromedioProducto_Categoria } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend,PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend,PointElement, LineElement);

export default function PromedioCategoria() {

    const [chartData, setChartData] = useState({
        labels:[],
        datasets:[
            {
                label:'',
                data:[],
                borderColor: '',
            }
        ]
      })
    
      useEffect(()=>{
        getPromedioProducto_Categoria().then(data=>{
            const  categoria = data.map((item:any) => item.categoryCode);
            const total = data.map((item:any) => item.Promedio_tipo_Categoria);
            
            setChartData({
                labels:categoria,
                datasets:[{
                    label: 'Valor promedio de productos por categoria',
                    data:total,
                    borderColor:'rgb(75, 192, 192)'
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

                    <Line data={chartData}/>
                </div>
            ) :(
                <div> loading..</div>
            )
        }
    </div>
        
    </>
  )
}