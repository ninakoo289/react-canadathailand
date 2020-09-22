class App extends React.Component {
  
  render() {
    return (
      <CurrencyConverter/>
    )  
  }  
}

class CurrencyConverter extends React.Component {
  constructor() {
    super();
    
    this.state = {
      baseCurrency:'THB',
      convertToCurrency:'CAD',
      baseAmount: 100,
      rates: [],
      currencies: []
    };
    
    this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
    this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
    this.changeBaseAmount = this.changeBaseAmount.bind(this);
    this.getConvertedCurrency = this.getConvertedCurrency.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }
  
  componentDidMount() {
   this.callAPI(this.state.baseCurrency)
  }
  
  changeBaseCurrency(e) {
    this.setState({ baseCurrency: e.target.value});
    this.callAPI(e.target.value)
    
  }
  
 callAPI(base) {
   const api = `https://api.exchangeratesapi.io/latest?base=${base}`;
    
    fetch(api)
     .then(results => {
        return results.json();
    }).then(data => this.setState({
      rates: data['rates'],
      currencies: Object.keys(data['rates']).sort()
    }));
   
 } 
  
  
  changeConvertToCurrency(e) {
    this.setState({
      convertToCurrency: e.target.value
    });
  }
  
  changeBaseAmount(e) {
   this.setState({
     baseAmount: e.target.value
   });
  }
  
  getConvertedCurrency(baseAmount,convertToCurrency,rates) {
      return Number.parseFloat(baseAmount * rates[convertToCurrency]).toFixed(3);
  }
  
  render() {
    const {currencies,rates,baseCurrency,baseAmount,convertToCurrency} = this.state;
    
    const currencyChoice = currencies.map(currency =>
      <option key={currency} value={currency}> {currency} </option>      
    );
                                          
    const result = this.getConvertedCurrency(baseAmount, convertToCurrency, rates);
    
    
    return(
      <div className="form-container">
        <form className='ui mini form'>
        
         <h5>Convert from: {baseCurrency}</h5>
          <select  value={baseCurrency} onChange={this.changeBaseCurrency}>
            {currencyChoice}
            <option>{baseCurrency}</option>
          </select>
        
          <h5>Convert to: {convertToCurrency}</h5>
          <select value={convertToCurrency} onChange={this.changeConvertToCurrency}>
            {currencyChoice}
          </select>
        
         <h5>Amount:</h5>
           <input type='number' 
                  id='base-amount' 
                  defaultValue={baseAmount} 
                  onChange={this.changeBaseAmount}>
          </input>                             
       </form>                       
       <h5 id='result-text'>{baseAmount} {baseCurrency} is equal to {result} {convertToCurrency}</h5>
     </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app1')
);

