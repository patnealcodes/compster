import { VictoryArea, VictoryChart, VictoryChartProps, VictoryContainer, VictoryGroup, VictoryLabel, VictoryPolarAxis, VictoryTheme } from "victory"
import { PokemonStat, Type } from "../../types/PokeAPI"

interface StatsChartProps extends VictoryChartProps {
  stats: PokemonStat[]
  typeColor: Type
}

function formatStats(stats: PokemonStat[]) {
  const formatted: any = {}
  for(const {stat, base_stat} of Object.values(stats)) {
    formatted[stat.name.replace('-', ' ')] = base_stat
  }
  return formatted
}

const StatsChart = (props: StatsChartProps) => {
  const MAX_STATS: any = { 'hp': 255, 'attack': 134, 'defense': 230, 'special attack': 130, 'special defense': 230, 'speed': 130 }

  function processData(data: any) {
    const makeDataArray = (d: any) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / MAX_STATS[key] }
      })
    }
    return makeDataArray(data)
  }

  const data = processData(formatStats(props.stats))

  return (
    <VictoryChart
      containerComponent={
        <VictoryContainer
          style={{
            pointerEvents: "auto",
            userSelect: "auto",
            touchAction: "auto"
          }}
        />
      }
      domain={{ y: [ 0, 1 ] }}
      polar
      theme={VictoryTheme.material}
    >
      <VictoryGroup colorScale={[props.typeColor]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
      >
        <VictoryArea data={data}/>
      </VictoryGroup>
    {
      data.map((stat, i) => {
        return (
          <VictoryPolarAxis key={i} dependentAxis
            style={{
              axisLabel: { padding: 10 },
              axis: { stroke: "none" },
              grid: { stroke: "none" }
            }}
            tickLabelComponent={
              <VictoryLabel labelPlacement="vertical"/>
            }
            labelPlacement="perpendicular"
            axisValue={i + 1} label={stat.x}
            tickFormat={(t) => Math.ceil(t * MAX_STATS[stat.x])}
            tickValues={[stat.y]}
          />
        )
      })
    }
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "grey", opacity: 0.25 },
          grid: { stroke: "grey", opacity: 0.5 }
        }}
      />

    </VictoryChart>
  )
}

export default StatsChart
