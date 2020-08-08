import React from "react";

import api from "../../services/api";
import { toMoney } from "../../utils/money";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

interface TeacherItemProps {
  id: string;
  image: string;
  name: string;
  subject: string;
  price: number;
  bio: string;
  whatsapp: string;
}

const TeacherItem: React.FC<TeacherItemProps> = ({
  id,
  image,
  name,
  subject,
  price,
  bio,
  whatsapp,
}) => {
  const createConnection = () => {
    api.post("connections", {
      user_id: id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={image} alt={`${name} profile`} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{toMoney(price)}</strong>
        </p>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={createConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
