//VARS
const endsWithOperator = /[*+/-]$/,
endsWithZero = /[*+/-][0]$/,
beginsWithOperator = /^[*/]/;

//COMPONENTS:
class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVal: '0',
      includeDecimal: false,
      evaluated: false };

    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  handleEvaluate() {
    let result = this.state.currentVal;
    if (endsWithOperator.test(result)) {
      result = result.slice(0, -1);
    }
    if (result) {
      result = Math.round(1000000000000 * eval(result)) / 1000000000000;
      if (this.state.currentVal.includes('.')) {
        this.setState({
          currentVal: String(result),
          includeDecimal: true,
          evaluated: true });

      } else {
        this.setState({
          currentVal: String(result),
          evaluated: true });

      }
    }
  }

  handleOperators(e) {
    const operator = e.target.value;
    const expression = this.state.currentVal;
    this.setState({
      currentVal: !endsWithOperator.test(expression) ?
      expression + operator :
      expression,
      includeDecimal: false,
      evaluated: false });

    if (expression === '0') {
      this.setState({
        currentVal: operator });

    }
    if (endsWithOperator.test(expression) && operator) {
      this.setState({
        currentVal: expression.replace(endsWithOperator, operator) });

    }
  }

  handleNumbers(e) {
    const value = e.target.value;
    const currentVal = this.state.currentVal;

    if (this.state.evaluated === true || beginsWithOperator.test(currentVal)) {
      this.setState({
        currentVal: value,
        evaluated: false,
        includeDecimal: false });

    } else if (endsWithZero.test(this.state.currentVal)) {
      this.setState({
        currentVal: currentVal + value.replace(/^0+/, '') });

    } else {
      this.setState({
        currentVal: currentVal === '0' ? value : currentVal + value });

    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: '0.',
        includeDecimal: true,
        evaluated: false });

    } else if (endsWithOperator.test(this.state.currentVal)) {
      this.setState({
        currentVal: this.state.currentVal + '0.',
        includeDecimal: true });

    } else if (this.state.includeDecimal === false) {
      this.setState({
        currentVal: this.state.currentVal + '.',
        includeDecimal: true });

    }
  }

  initialize() {
    this.setState({
      currentVal: '0',
      includeDecimal: false,
      evaluated: false });

  }

  render() {
    return (
      React.createElement("div", { className: "calculator" },
      React.createElement(Screen, { currentValue: this.state.currentVal }),
      React.createElement(Buttons, {
        evaluate: this.handleEvaluate,
        operators: this.handleOperators,
        numbers: this.handleNumbers,
        decimal: this.handleDecimal,
        initialize: this.initialize })));



  }}


class Buttons extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "calculator-keys" },
      React.createElement("button", { onClick: this.props.operators, id: "add", class: "operator", value: "+" }, "+"),
      React.createElement("button", { onClick: this.props.operators, id: "subtract", class: "operator", value: "-" }, "-"),
      React.createElement("button", { onClick: this.props.operators, id: "multiply", class: "operator", value: "*" }, "x"),
      React.createElement("button", { onClick: this.props.operators, id: "divide", class: "operator", value: "/" }, "/"),

      React.createElement("button", { onClick: this.props.numbers, id: "seven", value: "7" }, "7"),
      React.createElement("button", { onClick: this.props.numbers, id: "eight", value: "8" }, "8"),
      React.createElement("button", { onClick: this.props.numbers, id: "nine", value: "9" }, "9"),

      React.createElement("button", { onClick: this.props.numbers, id: "four", value: "4" }, "4"),
      React.createElement("button", { onClick: this.props.numbers, id: "five", value: "5" }, "5"),
      React.createElement("button", { onClick: this.props.numbers, id: "six", value: "6" }, "6"),

      React.createElement("button", { onClick: this.props.numbers, id: "one", value: "1" }, "1"),
      React.createElement("button", { onClick: this.props.numbers, id: "two", value: "2" }, "2"),
      React.createElement("button", { onClick: this.props.numbers, id: "three", value: "3" }, "3"),

      React.createElement("button", { onClick: this.props.numbers, id: "zero", value: "0" }, "0"),
      React.createElement("button", { onClick: this.props.decimal, id: "decimal", value: "." }, "."),
      React.createElement("button", { onClick: this.props.initialize, id: "clear", value: "clear" }, "AC"),

      React.createElement("button", { onClick: this.props.evaluate, id: "equals", value: "=" }, "=")));


  }}


class Screen extends React.Component {
  render() {
    return React.createElement("div", { id: "display", className: "calculator-screen" }, this.props.currentValue);
  }}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));