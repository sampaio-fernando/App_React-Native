import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";

export default function TelaFlashcards({ route, navigation }) {
  const { deck } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [studyMode, setStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showBack, setShowBack] = useState(false);

  // Criar flashcard
  const handleCreateFlashcard = () => {
    if (!front.trim() || !back.trim()) {
      Alert.alert("Atenção", "Frente e verso não podem ser vazios.");
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      front: front.trim(),
      back: back.trim(),
      nextReview: null,
    };

    setFlashcards(prev => [...prev, newCard]);
    setFront("");
    setBack("");
  };

  // Verificar resposta
  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === flashcards[currentIndex].back.trim().toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);

    // Mostra o verso após responder
    setShowBack(true);
  };

  // Simula espaçamento
  const scheduleReview = (minutes) => {
    const updated = [...flashcards];
    updated[currentIndex].nextReview = Date.now() + minutes * 60000;
    setFlashcards(updated);
  };

  // Próximo card
  const nextCard = () => {
    setShowBack(false);
    setShowResult(false);
    setIsCorrect(null);
    setUserAnswer("");

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert("Fim!", "Você terminou o deck!");
      setStudyMode(false);
      setCurrentIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deck: {deck.name}</Text>

      {!studyMode ? (
        <>
          {/* Lista */}
          <FlatList
            data={flashcards}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.front}>{item.front}</Text>
                <Text style={styles.back}>{item.back}</Text>
              </View>
            )}
          />

          {/* Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Frente (ex: pergunta)"
            value={front}
            onChangeText={setFront}
          />

          <TextInput
            style={styles.input}
            placeholder="Verso (ex: resposta correta)"
            value={back}
            onChangeText={setBack}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreateFlashcard}>
            <Text style={styles.buttonText}>Criar Flashcard</Text>
          </TouchableOpacity>

          {flashcards.length > 0 && (
            <TouchableOpacity
              style={[styles.button, styles.studyButton]}
              onPress={() => {
                setStudyMode(true);
                setCurrentIndex(0);
              }}
            >
              <Text style={styles.buttonText}>Estudar Deck</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

        </>
      ) : (
        <>
          {/* Flashcard */}
          <View style={styles.card}>
            <Text style={styles.front}>
              {!showBack
                ? flashcards[currentIndex].front // Mostra a frente
                : flashcards[currentIndex].back  // Mostra o verso
              }
            </Text>
          </View>

          {/* Usuário digita resposta (antes de mostrar o verso) */}
          {!showBack && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Digite sua resposta..."
                value={userAnswer}
                onChangeText={setUserAnswer}
              />

              <TouchableOpacity style={styles.button} onPress={checkAnswer}>
                <Text style={styles.buttonText}>Verificar Resposta</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Resultado + Botões ANKI */}
          {showBack && (
            <>
              <View style={styles.card}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: isCorrect ? "#2bd904ff" : "rgba(252, 46, 46, 1)"
                  }}
                >
                  {isCorrect ? "✔ Resposta Correta!" : "✘ Resposta Errada"}
                </Text>
                <Text style={{ marginTop: 10, color: "white" }}>
                  Correto: {flashcards[currentIndex].back}
                </Text>
              </View>

              {/* Botões ANKI */}
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.optionButton, styles.red]}
                  onPress={() => { scheduleReview(1); nextCard(); }}
                >
                  <Text style={styles.optionText}>Novamente{"\n"}1 min</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, styles.orange]}
                  onPress={() => { scheduleReview(10); nextCard(); }}
                >
                  <Text style={styles.optionText}>Difícil{"\n"}10 min</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, styles.blue]}
                  onPress={() => { scheduleReview(60); nextCard(); }}
                >
                  <Text style={styles.optionText}>Bom{"\n"}1 hora</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionButton, styles.green]}
                  onPress={() => { scheduleReview(1440); nextCard(); }}
                >
                  <Text style={styles.optionText}>Fácil{"\n"}1 dia</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Sair */}
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => setStudyMode(false)}
          >
            <Text style={styles.buttonText}>Sair do Estudo</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#282828ff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 1,
  },

  // INPUTS
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: "#2C2C2C",
    color: "white",
    fontSize: 17,
  },
  // BOTÕES PADRÃO
  button: {
    backgroundColor: "#006CFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,

    // Sombras
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: { backgroundColor: "#D12E2E" },
  studyButton: { backgroundColor: "#00A86B" },

  // CARD DOS FLASHCARDS
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#2C2C2C",

    // Sombras
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  front: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  back: {
    fontSize: 18,
    color: "#CCCCCC",
    marginTop: 10,
    textAlign: "center",
  },

  //CONTAINER DOS BOTÕES ANKI
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  optionButton: {
    width: "48%",
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",

    // Sombras
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },

  optionText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },

  red: { backgroundColor: "#E74C3C" },
  orange: { backgroundColor: "#F39C12" },
  blue: { backgroundColor: "#3498DB" },
  green: { backgroundColor: "#2ECC71" },
});