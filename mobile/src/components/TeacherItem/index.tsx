import React from "react";
import { Image, Linking, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import api from "../../services/api";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";

interface ToggleFavoriteInterface {
  (id: number): void;
}

interface TeacherItemProps {
  id: number;
  image: string;
  name: string;
  subject: string;
  price: number;
  bio: string;
  whatsapp: string;
  favorited: boolean;
  toggleFavorite: ToggleFavoriteInterface;
}

const TeacherItem: React.FC<TeacherItemProps> = ({
  id,
  image,
  name,
  subject,
  price,
  bio,
  whatsapp,
  favorited,
  toggleFavorite,
}) => {
  const handleLinkToWhatsapp = () => {
    api.post("connections", {
      user_id: id,
    });
    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: image }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {price},00</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <RectButton
            onPress={() => toggleFavorite(id)}
            style={[styles.favoriteButton, favorited ? styles.favorited : {}]}
          >
            <Image source={favorited ? unfavoriteIcon : heartOutlineIcon} />
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
