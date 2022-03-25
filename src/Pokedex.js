import { useState }     from 'react';
import { Box }          from '@mui/system';
import Button           from '@mui/material/Button';
import styles           from "./styles.css";
import Typography       from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Slider from '@mui/material/Slider';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Pokedex() {

    const axios = require('axios');
    const [poke, setPoke] = useState();
    const [index,setIndex] = useState(1);
    let previousIndex = 1;

    function getData() {
        if(poke){
            return 
        }
    
        else {axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
            .then( (response) => {
                setPoke(response.data)
            })
            .catch(function (error) {
                console.error(error);
            })
        }
        
    }

    function getNextData() {
        setIndex(index+1)

        if(index === previousIndex) {
            console.log('ei')
            return
        }
        else {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`)
            .then( (response) => {
                setPoke(response.data)
                previousIndex = previousIndex + 1
            })
            .catch(function (error) {
                console.error(error);
            })
        }
        
    }

    function getPrevData() {
        setIndex(index-1)

        if(index === previousIndex) {
            return
        }
        else {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`)
            .then( (response) => {
                setPoke(response.data)
                previousIndex = previousIndex - 1
            })
            .catch(function (error) {
                console.error(error);
            })
        }
    }

    function writeNumber() {
        let number = poke.id

        if(number < 10) {
            return (
                <Typography variant = 'body1'>
                    #00{number}
                </Typography>
            )
        }

        if(number < 100) {
            return (
                <Typography variant = 'body1'>
                    #0{number}
                </Typography>
            )
        }

        return (
            <Typography variant = 'body1'>
                #{number}
            </Typography>
        )
    }

    function changePallete() {

        let primaryColor
        let secondaryColor

        //MAIN COLOR 
        if (poke.types[0].type.name === 'fire' )     primaryColor = '#ef8a7e'
        if (poke.types[0].type.name === 'grass' )    primaryColor = '#92D1B5'
        if (poke.types[0].type.name === 'poison' )   primaryColor = '#992964'
        if (poke.types[0].type.name === 'dragon' )   primaryColor = '#419EAE'
        if (poke.types[0].type.name === 'water' )    primaryColor = '#B6CBE6'
        if (poke.types[0].type.name === 'bug' )      primaryColor = '#7DAD3F'
        if (poke.types[0].type.name === 'flying' )   primaryColor = '#EFF5FB'
        if (poke.types[0].type.name === 'fairy' )    primaryColor = '#F8CFD4'
        if (poke.types[0].type.name === 'normal' )   primaryColor = '#C6925D'
        if (poke.types[0].type.name === 'electric' ) primaryColor = '#F6E585'
        if (poke.types[0].type.name === 'ground' )   primaryColor = '#AD8D7B'
        if (poke.types[0].type.name === 'ice' )      primaryColor = '#E5ECF3'
        if (poke.types[0].type.name === 'fighting' ) primaryColor = '#2C5470'
        if (poke.types[0].type.name === 'psychic' ) primaryColor = '#C2AF4B'
        if (poke.types[0].type.name === 'rock' )    primaryColor = '#B4B4AC'
        if (poke.types[0].type.name === 'ghost' )   primaryColor = '#544A58'
        if (poke.types[0].type.name === 'steel' )   primaryColor = '#ADCBD0'

        //SECONDARY COLOR
        if(poke.types[1]) {
            if (poke.types[1].type.name === 'fire' )     secondaryColor = '#ef8a7e'
            if (poke.types[1].type.name === 'grass' )    secondaryColor = '#92D1B5'
            if (poke.types[1].type.name === 'poison' )   secondaryColor = '#992964'
            if (poke.types[1].type.name === 'dragon' )   secondaryColor = '#419EAE'
            if (poke.types[1].type.name === 'water' )    secondaryColor = '#B6CBE6'
            if (poke.types[1].type.name === 'bug' )      secondaryColor = '#7DAD3F'
            if (poke.types[1].type.name === 'flying' )   secondaryColor = '#EFF5FB'
            if (poke.types[1].type.name === 'fairy' )    secondaryColor = '#F8CFD4'
            if (poke.types[1].type.name === 'normal' )   secondaryColor = '#C6925D'
            if (poke.types[1].type.name === 'electric' ) secondaryColor = '#F6E585'
            if (poke.types[1].type.name === 'ground' )   secondaryColor = '#AD8D7B'
            if (poke.types[1].type.name === 'ice' )      secondaryColor = '#E5ECF3'
            if (poke.types[1].type.name === 'fighting' ) secondaryColor = '#2C5470'
            if (poke.types[1].type.name === 'psychic' ) secondaryColor = '#C2AF4B'
            if (poke.types[1].type.name === 'rock' )    secondaryColor = '#B4B4AC'
            if (poke.types[1].type.name === 'ghost' )   secondaryColor = '#544A58'
            if (poke.types[1].type.name === 'steel' )   secondaryColor = '#ADCBD0'        }
        else {
            secondaryColor = LightenDarkenColor(primaryColor, 40)
        }

        let theme = createTheme({
            typography: {
              fontFamily: [
                'Roboto'
              ],
              body1: {
                fontWeight: 600,
              },
              h2: {
                fontWeight: 500,
              },
            },
            palette: {
                primary: {
                  main: primaryColor,  // light dark contrastText: will be calculated from palette.primary.main,
                },
                secondary: {
                  main: secondaryColor,
                },
                contrastThreshold: 3,
                tonalOffset: 0.2,
              },
          });

        return theme
    }

    function writeName(word) {
        return word.charAt(0).toUpperCase() + word.slice(1) 
    }

    function writeType() {
        let firstType = poke.types[0].type.name;
        let secondType

        if(poke.types[1]) secondType = poke.types[1].type.name;

        return (
            <Typography >
               {writeName(firstType)} {secondType? (`   / ${writeName(secondType)} `):'' }
            </Typography>
        )
    }

    function renderImage() {
        let link = poke.sprites.front_default

        if(poke.sprites.other) {
            link = poke.sprites.other.dream_world.front_default
        }

        //link = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        return (
            <img 
                alt='Pokemon image' 
                src = {link}
                width="300" 
                height="300"
            />
        )
    }

    function valuetext(value) {
        return `${value}°C`;
      }
    function render(poke) {


        return (
            <Box className = "container" >
            
            <ThemeProvider theme={changePallete()}>
                <Box className = "top" sx={{ backgroundColor: 'primary.main'}} >
                    <Box className = "buttons">
                        <Button variant = "contained" onClick = { getPrevData } sx={{marginBottom:'50px'}}> v </Button>
                        <Button variant = "contained" onClick = { getNextData } sx={{marginBottom:'50px'}}> ^ </Button>
                    </Box>
                    <Box className = "background" sx={{ backgroundColor: 'secondary.light'}} >
                        {renderImage()}
                    </Box>
                </Box>

                <Box className = "middle"  sx={{ backgroundColor: 'primary.main'}}>
                    <Box className = "info">
                        <Box className = "number" sx={{ backgroundColor: 'secondary.light'}} >
                                {writeNumber()} 
                        </Box> 
                        <Box className = "name" >
                            <Typography variant="h2">
                                {writeName(poke.name)}
                            </Typography >
                        </Box>  
                        <Box className = "body1" >
                                {writeType()}
                        </Box>
                    </Box>

                    <Box className = "bottom" >
                            <Box >
                                <Typography variant='body1'>
                                    Overview
                                </Typography>               
                            </Box>

                            <Box >
                                <Typography  variant='body1'>
                                Stats
                                </Typography>               
                            </Box>  

                            <Box >
                                <Typography  variant='body1'>
                                Abilities
                                </Typography>               
                            </Box>    
                    </Box>     
                </Box>
            </ThemeProvider>
            </Box>
        )
    }

    return (
        <Box className = "container" >
            {getData()}
            {poke? 
                render(poke) 
                :''
            }
        </Box>
    )
}