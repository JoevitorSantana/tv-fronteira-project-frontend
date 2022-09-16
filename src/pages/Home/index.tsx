import { Link } from "react-router-dom";
import styled from "styled-components";
import bannerImg from '../../assets/setup.jpg'
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export function Home() {
  return (
    <>    
      <Container>
        <Header />  
        <Content>
          <Text>
            <Title>   
              <TitleContent>
                <p>1° Concurso</p>
                <h1>O Melhor PC Gamer do Oeste Paulista</h1>   
                <p>Acha que o seu PC é o melhor do mundo! então não perca tempo, participe do concurso de PC's da região Oeste Paulista.</p>  
              </TitleContent>       
              <ButtonArea>
                <Link to="/users/create">
                  <Button text="Participar"/>
                </Link>
              </ButtonArea>                          
            </Title>
          </Text>
          <Image>
            <ImageContainer>
              <img src={bannerImg} alt="pc" />  
            </ImageContainer>          
          </Image>
        </Content>
      </Container>    
    </>
  )
};

const ButtonArea = styled.div`
  width: 200px;
`;

const TitleContent = styled.div`
  margin: 20px 0;
`;

const Title = styled.div`  

  h1{
    font-size: 50px;
    font-weight: bold;
  }
  p{
    font-size: 20px;
  }
`;

const ImageContainer = styled.div`
  margin: 50px;
`;

const Image = styled.div`
  width: 50%;

  img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 0 50px 15px black;
  }

  @media(max-width:600px){
    width: 100%;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;   
  
  @media(max-width: 600px){
    width: 90%;
  }
`;

const Content = styled.div`
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 50px auto;  
  align-items: center;  

  @media(max-width: 600px){
    flex-direction: column;
    flex-wrap: wrap;    
  }
`;

const Container = styled.div`
  margin: 0;
  width: 100%;
`;