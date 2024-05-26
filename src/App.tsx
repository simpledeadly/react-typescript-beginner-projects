import { Block } from './Block'

export const App = () => {
  return (
    <div className="App">
      <Block value={0} currency="RUB" onChangeCurrency={cur => console.log(cur)} />
      <Block value={0} currency="USD" />
    </div>
  );
}
