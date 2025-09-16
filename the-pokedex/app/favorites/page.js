import { saveFavorite } from "@/api/index";

const handleSave = (pokemon) => {
  saveFavorite(pokemon).then(() => alert("Salvo!"));
};
