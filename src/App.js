import styled from "styled-components";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [alternatives, setAlternatives] = useState("A B C D E");
  const [pergunta, setPergunta] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const item = [
    {
      text: "Certo",
      isCorrect: false,
    },
    {
      text: "Errado",
      isCorrect: false,
    },
  ];
  const listaAlternativas = [
    {
      text: "",
      isCorrect: false,
    },
    {
      text: "",
      isCorrect: false,
    },
    {
      text: "",
      isCorrect: false,
    },
    {
      text: "",
      isCorrect: false,
    },
    {
      text: "",
      isCorrect: false,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pergunta === "") return toast.error("Preencha o campo pergunta");
    if (categoria === "") return toast.error("Preencha o campo categoria");
    if (
      alternatives === "C e E" &&
      item[0].isCorrect === false &&
      item[1].isCorrect === false
    )
      return toast.error("Preencha as alternativas");
    if (alternatives === "A B C D E") {
      if (
        listaAlternativas[0].text === "" ||
        listaAlternativas[1].text === "" ||
        listaAlternativas[2].text === "" ||
        listaAlternativas[3].text === "" ||
        listaAlternativas[4].text === ""
      )
        return toast.error("Preencha as alternativas");
    }

    const data = {
      description: pergunta,
      category: categoria,
      alternatives: alternatives === "C e E" ? item : listaAlternativas,
    };
    setLoading(true);
    const response = await axios
      .post("https://questions-database-backend.herokuapp.com/questions", data)
      .then((res) => {
        console.log(res);
        toast.success(`Você tem ${res.data.total} perguntas cadastradas`);
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao cadastrar pergunta");
      });

    return response;
  };
  return (
    <AppContainer>
      <ToastContainer />
      <Container>
        <h2>Cadastre uma pergunta</h2>
        <form onSubmit={handleSubmit}>
          <>
            <label>Pergunta:</label>
            <textarea
              onChange={(e) => setPergunta(e.target.value)}
              value={pergunta}
            >
              Digite uma pergunta
            </textarea>
          </>
          <StyledInput>
            <label>Categoria:</label>
            <select
              name="category"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option>Portugues</option>
              <option value="Matematica">Matematica</option>
              <option value="Informatica">Informatica</option>
              <option value="Fisica">Fisica</option>
              <option value="Etica">Etica</option>
              <option value="Geopolitica">Geopolitica</option>
              <option value="Historia">Historia</option>
              <option value="Direito administrativo">
                Direito administrativo
              </option>
              <option value="Legislação de transito">
                Legislação de transito
              </option>
              <option value="Direito constitucional">
                Direito constitucional
              </option>
              <option value="Direito penal">Direito penal</option>
              <option value="Legislação especial">Legislação especial</option>
              <option value="Direitos humanos">Direitos humanos</option>
            </select>
          </StyledInput>
          <StyledInput>
            <label>Alternativas:</label>
            <FlexContainer>
              <ButtonAlternatives
                onClick={(e) => {
                  setAlternatives("C e E");
                  e.preventDefault();
                }}
                selected={alternatives === "C e E"}
              >
                Certo ou Errado
              </ButtonAlternatives>
              <ButtonAlternatives
                onClick={(e) => {
                  setAlternatives("A B C D E");
                  e.preventDefault();
                }}
                selected={alternatives === "A B C D E"}
              >
                A B C D E
              </ButtonAlternatives>
            </FlexContainer>
            {alternatives === "C e E" && (
              <FlexContainer>
                <StyledRadio>
                  <input
                    type="radio"
                    name="alternatives"
                    onChange={() => (item[0].isCorrect = true)}
                  />{" "}
                  Certo
                </StyledRadio>
                <StyledRadio>
                  <input
                    type="radio"
                    name="alternatives"
                    onChange={() => (item[1].isCorrect = true)}
                  />{" "}
                  Errado
                </StyledRadio>
              </FlexContainer>
            )}
            {alternatives === "A B C D E" && (
              <CollumnContainer>
                <StyledRadio>
                  <FlexContainer>
                    <input
                      type="radio"
                      name="alternatives"
                      value="A"
                      onChange={() => (listaAlternativas[0].isCorrect = true)}
                    />
                    <p>A</p>
                    <InputQuestion
                      type="text"
                      name="description"
                      onChange={(e) =>
                        (listaAlternativas[0].text = e.target.value)
                      }
                    />
                  </FlexContainer>
                </StyledRadio>
                <StyledRadio>
                  <FlexContainer>
                    <input
                      type="radio"
                      name="alternatives"
                      value="B"
                      onChange={() => (listaAlternativas[1].isCorrect = true)}
                    />
                    <p>B</p>
                    <InputQuestion
                      type="text"
                      name="description"
                      onChange={(e) =>
                        (listaAlternativas[1].text = e.target.value)
                      }
                    />
                  </FlexContainer>
                </StyledRadio>
                <StyledRadio>
                  <FlexContainer>
                    <input
                      type="radio"
                      name="alternatives"
                      value="C"
                      onChange={() => (listaAlternativas[2].isCorrect = true)}
                    />
                    <p>C</p>
                    <InputQuestion
                      type="text"
                      name="description"
                      onChange={(e) =>
                        (listaAlternativas[2].text = e.target.value)
                      }
                    />
                  </FlexContainer>
                </StyledRadio>
                <StyledRadio>
                  <FlexContainer>
                    <input
                      type="radio"
                      name="alternatives"
                      value="D"
                      onChange={() => (listaAlternativas[3].isCorrect = true)}
                    />
                    <p>D</p>
                    <InputQuestion
                      type="text"
                      name="description"
                      onChange={(e) =>
                        (listaAlternativas[3].text = e.target.value)
                      }
                    />
                  </FlexContainer>
                </StyledRadio>
                <StyledRadio>
                  <FlexContainer>
                    <input
                      type="radio"
                      name="alternatives"
                      value="E"
                      onChange={() => (listaAlternativas[4].isCorrect = true)}
                    />
                    <p>E</p>
                    <InputQuestion
                      type="text"
                      name="description"
                      onChange={(e) =>
                        (listaAlternativas[4].text = e.target.value)
                      }
                    />
                  </FlexContainer>
                </StyledRadio>
              </CollumnContainer>
            )}
          </StyledInput>
          <ButtonSubmit disabled={loading}>Cadastrar Questão</ButtonSubmit>
        </form>
      </Container>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  width: 100%;
  background: #e6eaf6;
  display: flex;
  justify-content: center;
  height: 110vh;
`;

const Container = styled.div`
  max-width: 500px;
  padding: 40px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e6eaf6;
  box-shadow: 0px 10px 30px rgba(13, 51, 32, 0.1);
  border-radius: 6px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  h2 {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #274264;
    text-align: center;
  }
  label {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #8798ad;
  }
  textarea {
    width: 93%;
    background: #ffffff;
    border: 1px solid #bcc4de;
    border-radius: 6px;
    margin-top: 4px;
    padding: 16px;
    height: 108px;
    display: flex;
    align-items: flex-start;
    text-align: top;
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #8798ad;
  }
`;

const StyledInput = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  select {
    background: #ffffff;
    border: 1px solid #bcc4de;
    border-radius: 6px;
    margin-top: 4px;
    padding: 12px;
    height: 48px;
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #8798ad;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonAlternatives = styled.button`
  background: none;
  border: none;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #8798ad;
  cursor: pointer;
  width: 140px;
  margin-top: 10px;
  border-bottom: ${(props) => (props.selected ? "2px solid #274264" : "none")};
`;

const StyledRadio = styled.div`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #8798ad;
  cursor: pointer;
  margin-top: 40px;
  margin-left: 20px;
  p {
    margin-left: 12px;
  }
`;

const CollumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputQuestion = styled.input`
  background: #ffffff;
  border: 1px solid #bcc4de;
  border-radius: 6px;
  margin-top: 4px;
  padding: 12px;
  height: 28px;
  width: 100%;
  margin-left: 12px;
`;

const ButtonSubmit = styled.button`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  background: #495eec;
  border-radius: 6px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  height: 48px;
  width: 100%;
  margin-top: 40px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  transition: all 0.2s ease-in-out;
`;
