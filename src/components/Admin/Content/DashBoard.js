import './DashBoard.scss';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from '../../../services/apiService';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const DashBoard = (props) => {

  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    fetchDataOverview();
  },[])

  const fetchDataOverview = async () =>{
    let res = await getOverview();
    if(res && res.EC === 0){
      setDataOverView(res.DT);
      // process chart data
      let Qz = 0, Qs = 0, As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        { name: t("dashboard.chart.quizzes"), Qz },
        { name: t("dashboard.chart.questions"), Qs },
        { name: t("dashboard.chart.answers"), As }
      ]
      setDataChart(data)
    }
  }

  return (
    <div className="dashboard-container">
      <div className='title'>
          {t("dashboard.title")}
      </div>

      <div className='content'>
        <div className='c-left'>
          <div className='c-left-child'>
            <span className='desc'>{t("dashboard.totalUsers")}</span>
            <span className='num'>
              {dataOverView && dataOverView.users 
                && dataOverView.users.total ? 
                <>{dataOverView.users.total}</>
                : <>0</>
              }
            </span>
          </div>
          <div className='c-left-child'>
            <span className='desc'>{t("dashboard.totalQuiz")}</span>
            <span className='num'>
              {dataOverView && dataOverView.others 
                && dataOverView.others.countQuiz ? 
                <>{dataOverView.others.countQuiz}</>
                : <>0</>
              }
            </span>
          </div>
          <div className='c-left-child'>
            <span className='desc'>{t("dashboard.totalQuestions")}</span>
            <span className='num'>
              {dataOverView && dataOverView.others 
                && dataOverView.others.countQuestions ? 
                <>{dataOverView.others.countQuestions}</>
                : <>0</>
              }
            </span>
          </div>
          <div className='c-left-child'>
            <span className='desc'>{t("dashboard.totalAnswers")}</span>
            <span className='num'>
              {dataOverView && dataOverView.others 
                && dataOverView.others.countAnswers ? 
                <>{dataOverView.others.countAnswers}</>
                : <>0</>
              }
            </span>
          </div>
        </div>
        <div className='c-right'>
          <ResponsiveContainer width="95%" height={300}>
            <BarChart data={dataChart} barCategoryGap="10%" barGap={2}>
              {/* Grid nền nhẹ */}
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

              {/* Trục X + Trục Y */}
              <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#555" }} />
              <YAxis tick={{ fontSize: 14, fill: "#555" }} />

              {/* Tooltip + Legend */}
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}
              />
              <Legend wrapperStyle={{ fontSize: "14px" }} />

              {/* Bar với bo tròn */}
              <Bar dataKey="Qz" fill="#8884d8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Qs" fill="#82ca9d" radius={[6, 6, 0, 0]} />
              <Bar dataKey="As" fill="#6483d0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>  
      
    </div>
  );
};

export default DashBoard;
