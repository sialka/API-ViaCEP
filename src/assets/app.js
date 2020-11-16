const form = document.querySelector('#form')
const cep = document.querySelector(`#cep`)
const adress = document.querySelector(`#adress`)
const apiURL = 'https://viacep.com.br/ws/'
const erroDiv = document.querySelector('.erro')


insertCEPIntoPage = data => {      
  if(data.erro == true) {
    console.log("erro")
    // adress.innerHTML = `<li>Não existe Endereço para esse CEP</li>`
    erroDiv.style.display = "block"    
    erroDiv.innerHTML = `Não existe Endereço para esse CEP`
    return
  }
  
  adress.innerHTML = `
    <li>    
      <p>CEP: <span class="info">${data.cep}</span></p>      
      <p>Logradouro: <span class="info">${data.logradouro}</span></p>
      <p>Complemento: <span class="info">${data.complemento}</span></p>
      <p>Bairro: <span class="info">${data.bairro}</span></p>
      <p>Localidade: <span class="info">${data.localidade}</span></p>      
      <p>UF: <span class="info">${data.uf}</span></p>      
    </li>
  `
}  

const fetchCEP = async cep => {
  url = `${apiURL}${cep}/json/`

  const response = await fetch(url)    
  const data = await response.json()   
  
  insertCEPIntoPage(data) 
}

const handleFormSubmit = event => {
  event.preventDefault()  

  const searchTerm = cep.value.trim()
  const result = /[0-9]{5}-[\d]{3}/.test(searchTerm);
  cep.value = ''
  cep.focus()  

  if (!result) {
    erroDiv.style.display = "block"    
    erroDiv.innerHTML = `Digite um cep válido`
    return
  } 

  erroDiv.style.display = "none"
  fetchCEP(searchTerm)  
}

erroDiv.style.display = "none"

form.addEventListener('submit', handleFormSubmit) 