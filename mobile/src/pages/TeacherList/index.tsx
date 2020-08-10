import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import styles from "./styles";

const TeacherList = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFiltersSubmit = async () => {
    if (subject === "") return;
    if (weekDay === "") return;
    if (time === "") return;

    const response = await api.get("classes", {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    setTeachers(response.data);
    handleToggleFilter();
  };

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

  useEffect(() => {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res) {
        setFavorites(JSON.parse(res));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilter}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

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

export default TeacherList;
