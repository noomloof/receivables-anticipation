import { Bold, Container, Flex } from './styles';

const Result = ({ day, value }) => {
  return (
    <Container>
      {day === '1' ? (
        <Flex>
          <span className={`day-${day}`}>Amanhã:</span>&nbsp;&nbsp;{' '}
          <Bold className={`value-${value}`}>
            {(value / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Bold>{' '}
        </Flex>
      ) : (
        <Flex>
          <span className={`day-${day}`}>Em {day} dias:</span>&nbsp;&nbsp;{' '}
          <Bold className={`value-${value}`}>
            {(value / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Bold>
        </Flex>
      )}
    </Container>
  );
};

export default Result;
