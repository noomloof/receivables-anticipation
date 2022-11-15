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
  // Yep, this is an atrocity, I know.
  const { setLoading } = useContext(LoadingContext);

  const [results, setResults] = useState([]);

  const buttonClick = (e) => {
    setLoading(true);
    let array = [];

    if (!input1 || !input2 || !input3) {
      // Verifies if all inputs have a value,
      // whichever and whatever it is.

      toast.error('Ensure all obligatory fields are filled', {
        autoClose: 1000,
      });
      setLoading(false);
    } else {
      if (input4) {
        // If all inputs have values, checks for values,
        // separates them by commas, or substitutes dashes
        // and periods for commas, so that it can be turned
        // into an array.

        let formattedDays = input4.replaceAll(/\s/g, '').replace(/[.-]/g, ',');
        array = formattedDays.split(',').map((string) => Number(string));
      } else {
        array = [1, 30, 60, 90];
      }

      const attr1 = Number(input1);
      const attr2 = Number(input2);
      const attr3 = Number(input3.replace(/%/g, ''));

      if (isNaN(attr1) || isNaN(attr2) || isNaN(attr3)) {
        toast.error('Ensure given data is correct', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (attr1 < 1000) {
        toast.error('Value must be over 1000 cents', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (attr2 > 12) {
        toast.error('Number of installments must not be over 12', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (attr2 < 1) {
        toast.error('Number of installments must not be under 1', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (attr3 > 100) {
        toast.error('MDR value must not be over 100%', {
          autoClose: 1000,
        });
        setLoading(false);
      } else if (array.length > 10) {
        toast.error('Number of time spans must not exceed 10', {
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
            let array = [];
            let days = Object.keys(response.data);
            let values = Object.values(response.data);
            for (let i = 0; i < days.length; i++) {
              array.push({ day: days[i], value: values[i] });
            }
            setResults(array);
            setLoading(false);
            toast.success('Simulation completed. Results are being shown.', {
              autoClose: 1000,
            });
          })
          .catch((error) => {
            if (error.response.status === 408) {
              toast.error('Your request timed out', { autoClose: 1000 });
              setLoading(false);
            } else if (error.response.status === 500) {
              toast.error(
                'There was an internal server error. Please try again later.',
                { autoClose: 1000 }
              );
              setLoading(false);
            }
          });
      }
    }
  };

  return (
    <Container>
      <DualHolder>
        <InputHolder>
          <h2 className='calc-title'>Simulate your prepayment</h2>
          <Input
            name='value'
            label='Input the sale value *'
            detail='In cents.'
            setInput1={setInput1}
          />
          <Input
            name='installments'
            label='How many installments? *'
            detail='12 installments maximum.'
            setInput2={setInput2}
          />
          <Input
            name='percent'
            label='MDR percentage *'
            detail='Percent sign not necessary.'
            setInput3={setInput3}
          />
          <Input
            name='days'
            label='Input the time spans'
            setInput4={setInput4}
            detail='In days. Separate them with commas. Optional.'
          />
          <Button
            text='Simulate'
            buttonClick={buttonClick}
          />
        </InputHolder>
        <ResultsHolder>
          <h1 className='result-title'> YOU'LL RECEIVE: </h1>
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
