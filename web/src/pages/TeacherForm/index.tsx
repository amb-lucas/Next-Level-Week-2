import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

import api from "../../services/api";

import formatTime from "../../utils/time";
import subjects from "../../utils/selectValues/subjects";
import days from "../../utils/selectValues/days";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

const TeacherForm = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState(0);

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "0", from: "00:00", to: "00:00" },
  ]);

  const addScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: "0", from: "00:00", to: "00:00" },
    ]);
  };
  const setScheduleItemValue = (i: number, field: string, value: string) => {
    const updatedItems = scheduleItems;
    updatedItems[i] = { ...updatedItems[i], [field]: value };
    setScheduleItems(updatedItems);
  };

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        history.push("/");
      })
      .catch(() => {
        alert("Erro no cadastro");
      });
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              onChange={(e) => setWhatsapp(e.target.value)}
            />

            <TextArea
              name="bio"
              label="Biografia"
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              options={subjects}
              instruction="Selecione uma matéria"
              onChange={(e) => setSubject(e.target.value)}
            />
            <Input
              name="cost"
              label="Custo por hora (em R$)"
              type="number"
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis{" "}
              <button type="button" onClick={addScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, i) => (
              <div key={`schedule-item-${i}`} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  options={days}
                  onChange={(e) =>
                    setScheduleItemValue(i, "week_day", e.target.value)
                  }
                />

                <div className="from-time">
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(
                        i,
                        "from",
                        formatTime(e.target.value)
                      )
                    }
                  />
                </div>

                <div className="to-time">
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(i, "to", formatTime(e.target.value))
                    }
                  />
                </div>
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
