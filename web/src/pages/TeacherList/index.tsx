import React, { useState, useEffect } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import Input from "../../components/Input";
import Select from "../../components/Select";

import api from "../../services/api";

import formatTime from "../../utils/time";
import subjects from "../../utils/selectValues/subjects";
import days from "../../utils/selectValues/days";

import "./styles.css";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("12:00");

  useEffect(() => {
    if (subject === "") return;
    if (weekDay === "") return;
    if (time === "") return;

    api
      .get("classes", {
        params: {
          subject,
          week_day: weekDay,
          time,
        },
      })
      .then(({ data }) => setTeachers(data));
  }, [subject, weekDay, time]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            options={subjects}
            instruction="Selecione uma matéria"
            onChange={(e) => setSubject(e.target.value)}
          />

          <Select
            name="weekday"
            label="Dia da Semana"
            options={days}
            instruction="Selecione um dia"
            onChange={(e) => setWeekDay(e.target.value)}
          />

          <Input
            name="time"
            label="Horário"
            type="time"
            defaultValue="12:00"
            onChange={(e) => setTime(formatTime(e.target.value))}
          />
        </form>
      </PageHeader>

      <main>
        {teachers.length === 0 ? (
          <h2 className="empty-results">Nenhum resultado encontrado.</h2>
        ) : (
          teachers.map(
            ({ name, avatar, subject, bio, cost, whatsapp, user_id }, i) => (
              <TeacherItem
                id={user_id}
                key={`${i}-${name}`}
                name={name}
                image={avatar}
                subject={subject}
                bio={bio}
                price={cost}
                whatsapp={whatsapp}
              />
            )
          )
        )}
      </main>
    </div>
  );
};

export default TeacherList;
