"use client"

import { useRef, useEffect } from "react"
import * as echarts from "echarts"

interface MobileChartProps {
  type: "bar" | "pie" | "line"
  data: any[]
  height?: number
  options?: any
}

export function MobileChart({ type, data, height = 200, options = {} }: MobileChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      let defaultOption = {}

      switch (type) {
        case "bar":
          defaultOption = {
            grid: {
              left: "10%",
              right: "10%",
              top: "15%",
              bottom: "25%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: data.map((item) => item.name || item.year),
              axisLabel: {
                fontSize: 11,
                color: "#374151",
                fontWeight: "500",
              },
              axisLine: {
                lineStyle: { color: "#e5e7eb" },
              },
              axisTick: {
                lineStyle: { color: "#e5e7eb" },
              },
            },
            yAxis: {
              type: "value",
              axisLabel: {
                fontSize: 10,
                color: "#6b7280",
              },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: {
                lineStyle: {
                  color: "#f3f4f6",
                  type: "dashed",
                },
              },
            },
            series: [
              {
                name: "Bronce",
                type: "bar",
                stack: "medals",
                data: data.map((item) => item.bronce || 0),
                itemStyle: {
                  color: "#92400e",
                  borderRadius: [0, 0, 4, 4],
                },
                barWidth: "50%",
              },
              {
                name: "Plata",
                type: "bar",
                stack: "medals",
                data: data.map((item) => item.plata || 0),
                itemStyle: { color: "#6b7280" },
                barWidth: "50%",
              },
              {
                name: "Oro",
                type: "bar",
                stack: "medals",
                data: data.map((item) => item.oro || 0),
                itemStyle: {
                  color: "#f59e0b",
                  borderRadius: [4, 4, 0, 0],
                },
                barWidth: "50%",
              },
            ],
            tooltip: {
              trigger: "axis",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#e5e7eb",
              borderWidth: 1,
              textStyle: {
                fontSize: 12,
                color: "#374151",
              },
              formatter: (params: any) => {
                let result = `<div style="font-weight: 600; margin-bottom: 8px; color: #111827;">${params[0].axisValue}</div>`
                let total = 0
                // Reverse order to show Oro, Plata, Bronce
                const reversedParams = [...params].reverse()
                reversedParams.forEach((param: any) => {
                  const icon = param.seriesName === "Oro" ? "🥇" : param.seriesName === "Plata" ? "🥈" : "🥉"
                  result += `<div style="display: flex; justify-content: space-between; align-items: center; margin: 4px 0;">
                    <span>${icon} ${param.seriesName}:</span>
                    <span style="font-weight: 600; margin-left: 12px;">${param.value}</span>
                  </div>`
                  total += param.value
                })
                result += `<div style="border-top: 1px solid #e5e7eb; margin-top: 8px; padding-top: 8px; font-weight: 600; color: #111827;">
                  <div style="display: flex; justify-content: space-between;">
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                </div>`
                return result
              },
              extraCssText: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 8px;",
            },
            legend: {
              data: ["Oro", "Plata", "Bronce"],
              bottom: 5,
              textStyle: {
                fontSize: 10,
                color: "#374151",
              },
              itemGap: 15,
              icon: "roundRect",
            },
          }
          break

        case "pie":
          defaultOption = {
            series: [
              {
                type: "pie",
                radius: ["35%", "70%"],
                center: ["50%", "50%"],
                data: data,
                label: {
                  fontSize: 10,
                  formatter: "{b}\n{d}%",
                  color: "#374151",
                  fontWeight: "500",
                },
                labelLine: {
                  length: 15,
                  length2: 8,
                  lineStyle: { color: "#9ca3af" },
                },
                itemStyle: {
                  borderWidth: 2,
                  borderColor: "#ffffff",
                },
              },
            ],
            tooltip: {
              trigger: "item",
              textStyle: { fontSize: 12 },
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#e5e7eb",
              extraCssText: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 8px;",
            },
          }
          break

        case "line":
          defaultOption = {
            grid: {
              left: "10%",
              right: "10%",
              top: "10%",
              bottom: "15%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: data.map((item) => item.name || item.month),
              axisLabel: { fontSize: 10, color: "#6b7280" },
            },
            yAxis: {
              type: "value",
              axisLabel: { fontSize: 10, color: "#6b7280" },
            },
            series: [
              {
                type: "line",
                data: data.map((item) => item.value || item.score),
                itemStyle: { color: "#10b981" },
                lineStyle: { width: 3 },
                symbol: "circle",
                symbolSize: 6,
                smooth: true,
              },
            ],
            tooltip: {
              trigger: "axis",
              textStyle: { fontSize: 12 },
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              extraCssText: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 8px;",
            },
          }
          break
      }

      const finalOption = { ...defaultOption, ...options }
      chart.setOption(finalOption)

      const handleResize = () => chart.resize()
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        chart.dispose()
      }
    }
  }, [type, data, options])

  return <div ref={chartRef} style={{ width: "100%", height: `${height}px` }} />
}
