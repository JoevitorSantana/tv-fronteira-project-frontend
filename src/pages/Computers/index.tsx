import {useState, useEffect} from 'react';
import api from '../../service/api';
import styled from 'styled-components';
import { DashboardHeader } from '../../components/LoginHeader';
import BannerImg from '../../assets/banner.jpg';
import { useAuth } from '../../hooks/AuthContext';
import { AiFillLike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import profile from '../../assets/avatar.png';

interface IComputers{
  processor: string;
  memory: string;
  storage: string;
  value: string;
  videoCard: string;
  user: [{
    name: string;
    avatarUrl: string;
    lastName: string;
  }];
  _id: string;  
  imageUrl: string;
}

export function Computers() {

  const [computers, setComputers] = useState<IComputers[]>([]);  
  const {updateUser} = useAuth();



  useEffect(() => {
    api.get<IComputers[]>('/computers')
    .then((response) => {
      const computers = response.data.map(computer => {
        return{
          ...computer
        }
      })
      setComputers(computers);
    });    

    navigator.geolocation.getCurrentPosition((position)=>{            
        const geolocationData = {            
            lat: position.coords.latitude,
            lng: position.coords.longitude            
        }

        api.put('/users/update', geolocationData)
        .then(response =>{
            updateUser(response.data);
        })
    });        


  }, [updateUser]);
  

  return (
    <>      
      <DashboardHeader />
      <Container>
        <Content>
          <Title>
            <Banner src={BannerImg} alt="Banner"/>
          </Title>     
          <h1 style={{marginLeft: '10px'}}>Computadores</h1>
          <ComputerList>            
            <ComputerListContainer>
              {computers && computers.map((computer) => (
                <Link key={computer._id} to={`/computers/computer/${computer._id}`}>
                  <Card>
                    <ImageContainer>
                      <Image src={computer.imageUrl}/>
                    </ImageContainer>
                    <InfoComputer>
                      <InfoComputerContainer>
                        <Avatar src={computer["user"][0]["avatarUrl"] ? computer["user"][0]["avatarUrl"] : profile}/>                      
                        <UserName>
                          {computer['user'][0]['name']} {computer['user'][0]['lastName']}
                        </UserName>
                        <AiFillLike color='grey' size={20}/>
                      </InfoComputerContainer>                   
                    </InfoComputer>
                  </Card>
                </Link>
              ))}              
            </ComputerListContainer>
          </ComputerList>
        </Content>
      </Container>
    </>    
  )
};

const UserName = styled.div`
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: contain;
`;

const InfoComputerContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;

  svg{
    margin: 0 20px;
  }
`;

const InfoComputer = styled.div`

`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px 16px 0 0;
`;

const ImageContainer = styled.div`
  width: 298px;
  height: 300px;
  background: #000;
  border-radius: 16px 16px 0 0;  
`;

const Card = styled.div`
  width: 300px;
  height: 400px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-right: 30px;
  margin-bottom: 30px;

  &::last-child{
    margin-right: 0;
  }

  @media(max-width: 600px){
    margin-right: 0;
  }
`;

const Banner = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: 50px;
`;

const Title = styled.div`  
  width: 100%;
  margin: 50px 0 50px 0;
  h1{
    font-size: 50px;
    font-weight: bold;
  }
  p{
    font-size: 20px;
  }
`;

const ComputerListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;  

  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const ComputerList = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px auto;
`;

const Content = styled.div`
  max-width: 1024px;
  width: 100%;  
  margin: 0 auto;
  height:
`;

const Container = styled.div`  
  margin: 0;
`;