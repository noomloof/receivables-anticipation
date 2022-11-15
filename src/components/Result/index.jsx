import { Bold, Container, Flex } from './styles';

const Result = ({ day, value }) => {
  // Receiving day and value through props;
  // They are used both for assigning values and
  // displaying them, as well as naming classes
  // for e2e testing.

  return (
    <Container>
      {day === '1' ? (
        <Flex>
          <span className={`day-${day}`}>Tomorrow:</span>&nbsp;&nbsp;{' '}
          <Bold className={`value-${value}`}>
            {(value / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Bold>{' '}
        </Flex>
      ) : (
        <Flex>
          <span className={`day-${day}`}>In {day} days:</span>&nbsp;&nbsp;{' '}
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
