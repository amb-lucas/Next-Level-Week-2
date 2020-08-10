import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import styles from "./styles";

interface ApiTeacherResponse {
  user_id: number;
  avatar: string;
  name: string;
  subject: string;
  cost: number;
  bio: string;
  whatsapp: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState<ApiTeacherResponse[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res) setFavorites(JSON.parse(res));
    });
  }, []);

  const loadTeachers = async () => {
    const updatedTeachers = [];

    for (let i = 0; i < favorites.length; i++) {
      const { data } = await api.get(`classes/${favorites[i]}`);
      updatedTeachers.push(data);
    }

    setTeachers(updatedTeachers);
  };

  useEffect(() => {
    loadTeachers();
  }, [favorites]);

  const handleToggleFavorite = async (id: number) => {
    const favoritedTeachers = await AsyncStorage.getItem("favorites");

    let favoritesArr = [];
    if (favoritedTeachers) favoritesArr = JSON.parse(favoritedTeachers);

    if (favoritesArr.includes(id)) {
      favoritesArr = favoritesArr.filter((item: number) => item !== id);
    } else favoritesArr.push(id);

    setFavorites(favoritesArr);
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArr));
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map(
          ({ user_id, avatar, bio, cost, name, subject, whatsapp }, i) => (
            <TeacherItem
              key={`${i}-${name}`}
              id={user_id}
              image={avatar}
              name={name}
              subject={subject}
              price={cost}
              bio={bio}
              whatsapp={whatsapp}
              favorited={favorites.includes(user_id)}
              toggleFavorite={handleToggleFavorite}
            />
          )
        )}
      </ScrollView>
    </View>
  );
};

export default Favorites;
