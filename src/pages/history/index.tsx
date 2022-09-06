import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useCycleContext } from 'src/contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

const History = () => {
  const { cycles } = useCycleContext()

  return (
    <HistoryContainer>
      <h1 className="title">Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(
              ({
                id,
                task,
                minutesAmount,
                startDate,
                interruptDate,
                finishedDate,
              }) => (
                <tr key={id}>
                  <td>{task}</td>
                  <td>{minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {interruptDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {!interruptDate && !finishedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
export default History
