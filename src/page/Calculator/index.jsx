import { useContext, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Input1Context } from '../../providers/input1';
import { Input2Context } from '../../providers/input2';
import { Input3Context } from '../../providers/input3';
import { Input4Context } from '../../providers/input4';
import api from '../../services/api';
import {
  Container,
  DualHolder,
  HR,
  InputHolder,
  ResultsHolder,
} from './styles';
import { toast } from 'react-toastify';
import Result from '../../components/Result';
import { LoadingContext } from '../../providers/loading';

const Calculator = () => {
  const { input1, setInput1 } = useContext(Input1Context);
  const { input2, setInput2 } = useContext(Input2Context);
  const { input3, setInput3 } = useContext(Input3Context);
  const { input4, setInput4 } = useContext(Input4Context);
  const { setLoading } = useContext(LoadingContext);

  const [results, setResults] = useState([]);

  const buttonClick = (e) => {
    setLoading(true);
    let array = [];

    if (!input1 || !input2 || !input3) {
      toast.error('Verifique se os campos obrigatórios estão preenchidos', {
        autoClose: 1000,
      });
      setLoading(false);
    } else {
      if (input4) {
        let formattedDays = input4.replaceAll(/\s/g, '').replace(/[.-]/g, ',');
        console.log(formattedDays);
        array = formattedDays.split(',').map((string) => Number(string));
        console.log(array);
      } else {
        array = [1, 30, 60, 90];
      }

      const attr1 = Number(input1);
      const attr2 = Number(input2);
      const attr3 = Number(input3.replace(/%/g, ''));

      if (isNaN(attr1) || isNaN(attr2) || isNaN(attr3)) {
        toast.error('Verifique se os dados inseridos estão corretos', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (attr1 < 1000) {
        toast.error('Valor deve ser acima ou igual a 1000 centavos', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (attr2 > 12) {
        toast.error('O número de parcelas não pode exceder 12', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (attr3 > 100) {
        toast.error('A taxa MDR não pode superar 100%', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (array.length > 10) {
        toast.error('O número de periodos de tempo não pode exceder 10', {
          autoClose: 1000,
        });
        setLoading(false);
      } else {
        const newBody = {
          amount: attr1,
          installments: attr2,
          mdr: attr3,
          days: array,
        };

        api
          .post('', newBody)
          .then((response) => {
            console.log(response.data);
            let array = [];
            let days = Object.keys(response.data);
            let values = Object.values(response.data);
            for (let i = 0; i < days.length; i++) {
              array.push({ day: days[i], value: values[i] });
            }
            setResults(array);
            setLoading(false);
            console.log(results);
          })
          .catch((error) => console.log(error.response.data));
      }
    }
  };

  return (
    <Container>
      <DualHolder>
        <InputHolder>
          <h2 className='calc-title'>Simule sua antecipação</h2>
          <Input
            name='value'
            label='Informe o valor de venda'
            detail='Em centavos.'
            setInput1={setInput1}
          />
          <Input
            name='installments'
            label='Em quantas parcelas'
            detail='Máximo de 12 parcelas.'
            setInput2={setInput2}
          />
          <Input
            name='percent'
            label='Percentual de MDR'
            detail='Símbolo de porcentagem não necessário.'
            setInput3={setInput3}
          />
          <Input
            name='days'
            label='Informe os períodos de tempo'
            setInput4={setInput4}
            detail='Em dias, separe os valores com virgulas. Opcional.'
          />
          <Button
            text='Simular'
            buttonClick={buttonClick}
          />
        </InputHolder>
        <ResultsHolder>
          <h1 className='result-title'> VOCÊ RECEBERÁ: </h1>
          <HR>
            <hr></hr>
          </HR>
          {results.length > 1
            ? results.map((result, index) => (
                <Result
                  day={result.day}
                  value={result.value}
                />
              ))
            : [
                { day: '1', value: 0 },
                { day: '30', value: 0 },
                { day: '60', value: 0 },
                { day: '90', value: 0 },
              ].map((result, index) => (
                <Result
                  day={result.day}
                  value={result.value}
                />
              ))}
        </ResultsHolder>
      </DualHolder>
    </Container>
  );
};

export default Calculator;
