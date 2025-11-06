
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client"
import App from "./app.js"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)

// Additional updates can be inserted here if needed

"use client"

import { useState } from "https://esm.sh/react@18.2.0"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "https://esm.sh/recharts@2.12.7"
import {
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Package,
  AlertCircle,
  Zap,
  ShoppingCart,
  AlertTriangle,
} from "https://esm.sh/lucide@latest"

// KPI Data
const kpis = [
  { title: "Más Vendidos", value: "248", icon: TrendingUp, change: "+12.5%", changeType: "up" },
  { title: "Stock Crítico", value: "34", icon: AlertCircle, change: "-8.2%", changeType: "down" },
  { title: "Rotación Promedio", value: "6.8x", icon: Zap, change: "+3.1%", changeType: "up" },
  { title: "Total Inventario", value: "12,847", icon: Package, change: "+2.4%", changeType: "up" },
]

// Chart Data
const monthlyData = [
  { name: "Semana 1", mujer: 2840, hombre: 2210, niño: 2290, niña: 2000 },
  { name: "Semana 2", mujer: 3200, hombre: 2400, niño: 2640, niña: 2260 },
  { name: "Semana 3", mujer: 2940, hombre: 2210, niño: 2290, niña: 2200 },
  { name: "Semana 4", mujer: 3500, hombre: 2700, niño: 3000, niña: 2500 },
]

// Rotation Data
const rotationData = [
  { id: 1, product: "JEANS TERMINADOS", gender: "Mujer", size: "M", sales: 480, rotation: 8.2, trend: "up" },
  { id: 2, product: "CAMISAS", gender: "Hombre", size: "L", sales: 320, rotation: 6.5, trend: "up" },
  { id: 3, product: "PANTALONES", gender: "Mujer", size: "S", sales: 290, rotation: 5.8, trend: "up" },
  { id: 4, product: "BUZOS", gender: "Niño", size: "12", sales: 215, rotation: 4.2, trend: "down" },
  { id: 5, product: "VESTIDOS", gender: "Niña", size: "8", sales: 245, rotation: 5.1, trend: "up" },
  { id: 6, product: "PIJAMAS", gender: "Mujer", size: "M", sales: 180, rotation: 3.8, trend: "down" },
  { id: 7, product: "CAMISAS", gender: "Niño", size: "10", sales: 160, rotation: 3.2, trend: "down" },
  { id: 8, product: "JEANS TERMINADOS", gender: "Hombre", size: "XL", sales: 420, rotation: 7.6, trend: "up" },
]

// Recommendations Data
const recommendations = [
  {
    type: "stock",
    title: "Aumentar Stock",
    description: "JEANS TERMINADOS (Mujer M) tiene alta rotación",
    icon: ShoppingCart,
    color: "text-primary",
  },
  {
    type: "discount",
    title: "Aplicar Descuento",
    description: "PIJAMAS (Mujer M) baja rotación - 15% recomendado",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    type: "warning",
    title: "Revisar Stock Crítico",
    description: "34 productos bajo stock mínimo",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    type: "opportunity",
    title: "Oportunidad de Compra",
    description: "VESTIDOS (Niña) tendencia al alza",
    icon: Zap,
    color: "text-primary",
  },
]

export default function Dashboard() {
  const [selectedGender, setSelectedGender] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const genders = ["Mujer", "Hombre", "Niño", "Niña"]
  const categories = ["CAMISAS", "JEANS TERMINADOS", "PANTALONES", "BUZOS", "PIJAMAS", "VESTIDOS"]
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "4", "6", "8", "10", "12", "14", "16"]
  const periods = ["Semana", "Mes", "Trimestre", "Año"]

  const filteredData = rotationData.filter((item) => {
    if (selectedGender !== "all" && item.gender !== selectedGender) return false
    if (selectedCategory !== "all" && item.product !== selectedCategory) return false
    if (selectedSize !== "all" && item.size !== selectedSize) return false
    return true
  })

  const isBar = selectedPeriod === "trimestre" || selectedPeriod === "año"

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2.5rem" }}>
        {/* Header */}
        <div style={{ paddingBottom: "3rem", borderBottom: "1px solid var(--border)", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div
                  style={{ padding: "0.75rem", backgroundColor: "rgba(30, 58, 138, 0.1)", borderRadius: "0.375rem" }}
                >
                  <ShoppingBag style={{ width: "1.25rem", height: "1.25rem", color: "var(--primary)" }} />
                </div>
                <h1
                  style={{ fontSize: "3rem", fontWeight: "300", letterSpacing: "0.05em", color: "var(--foreground)" }}
                >
                  Inventory
                </h1>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--muted-foreground)",
                  fontWeight: "300",
                  letterSpacing: "0.1em",
                }}
              >
                Análisis inteligente de rotación y stock
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <div
                key={kpi.title}
                className="card"
                style={{
                  padding: "2rem",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                  borderRadius: "0.375rem",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-foreground)",
                        fontWeight: "500",
                      }}
                    >
                      {kpi.title}
                    </p>
                    <Icon style={{ width: "1rem", height: "1rem", color: "rgba(30, 58, 138, 0.5)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <h3 style={{ fontSize: "2.25rem", fontWeight: "300", color: "var(--foreground)" }}>{kpi.value}</h3>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        letterSpacing: "0.05em",
                        color: kpi.changeType === "up" ? "var(--primary)" : "var(--destructive)",
                      }}
                    >
                      {kpi.change} vs mes anterior
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div
          className="card"
          style={{
            padding: "2rem",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            borderRadius: "0.375rem",
            marginBottom: "3rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <h3
              style={{
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: "500",
                color: "var(--foreground)",
              }}
            >
              Filtros
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--muted-foreground)",
                    fontWeight: "500",
                  }}
                >
                  Género
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["all", ...genders].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      style={{
                        borderRadius: "0.375rem",
                        padding: "0.5rem 0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        border: `1px solid ${selectedGender === gender ? "var(--primary)" : "var(--border)"}`,
                        backgroundColor: selectedGender === gender ? "var(--primary)" : "transparent",
                        color: selectedGender === gender ? "var(--primary-foreground)" : "var(--foreground)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {gender === "all" ? "Todos" : gender}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--muted-foreground)",
                    fontWeight: "500",
                  }}
                >
                  Categoría
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    cursor: "pointer",
                  }}
                >
                  <option value="all">Todas</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--muted-foreground)",
                    fontWeight: "500",
                  }}
                >
                  Talla
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    cursor: "pointer",
                  }}
                >
                  <option value="all">Todas</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--muted-foreground)",
                    fontWeight: "500",
                  }}
                >
                  Período
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    cursor: "pointer",
                  }}
                >
                  {periods.map((period) => (
                    <option key={period} value={period.toLowerCase()}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Recommendations */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div style={{ gridColumn: "span 2" }}>
            <div
              className="card"
              style={{
                padding: "2rem",
                border: "1px solid var(--border)",
                backgroundColor: "var(--card)",
                borderRadius: "0.375rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3
                    style={{
                      fontSize: "0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: "500",
                      color: "var(--foreground)",
                    }}
                  >
                    Tendencia de Ventas
                  </h3>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted-foreground)",
                      marginTop: "0.75rem",
                      fontWeight: "300",
                    }}
                  >
                    Rotación de productos por género
                  </p>
                </div>
                <div style={{ height: "320px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {isBar ? (
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                        <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: `1px solid var(--border)`,
                            color: "var(--foreground)",
                            borderRadius: "4px",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="mujer" fill="var(--chart-1)" radius={3} />
                        <Bar dataKey="hombre" fill="var(--chart-2)" radius={3} />
                        <Bar dataKey="niño" fill="var(--chart-3)" radius={3} />
                        <Bar dataKey="niña" fill="var(--chart-4)" radius={3} />
                      </BarChart>
                    ) : (
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                        <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: `1px solid var(--border)`,
                            color: "var(--foreground)",
                            borderRadius: "4px",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="mujer" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                        <Line type="monotone" dataKey="hombre" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
                        <Line type="monotone" dataKey="niño" stroke="var(--chart-3)" strokeWidth={2.5} dot={false} />
                        <Line type="monotone" dataKey="niña" stroke="var(--chart-4)" strokeWidth={2.5} dot={false} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card"
            style={{
              padding: "2rem",
              border: "1px solid var(--border)",
              backgroundColor: "var(--card)",
              borderRadius: "0.375rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3
                  style={{
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: "500",
                    color: "var(--foreground)",
                  }}
                >
                  Recomendaciones
                </h3>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted-foreground)",
                    marginTop: "0.75rem",
                    fontWeight: "300",
                  }}
                >
                  Acciones basadas en datos
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {recommendations.map((rec, idx) => {
                  const Icon = rec.icon
                  return (
                    <div
                      key={idx}
                      style={{
                        borderRadius: "0.375rem",
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--secondary)",
                        padding: "1rem",
                        display: "flex",
                        gap: "1rem",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <div style={{ marginTop: "0.125rem", flexShrink: 0 }}>
                        <Icon style={{ width: "1.25rem", height: "1.25rem" }} className={rec.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--foreground)" }}>
                          {rec.title}
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--muted-foreground)",
                            marginTop: "0.25rem",
                            fontWeight: "300",
                          }}
                        >
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className="card"
          style={{
            padding: "2rem",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            borderRadius: "0.375rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: "500",
                  color: "var(--foreground)",
                }}
              >
                Rotación de Productos
              </h3>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                  marginTop: "0.75rem",
                  fontWeight: "300",
                }}
              >
                Análisis detallado de movimiento mensual
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th
                      style={{
                        padding: "1rem 1.5rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-foreground)",
                        fontWeight: "500",
                      }}
                    >
                      Producto
                    </th>
                    <th
                      style={{
                        padding: "1rem 1.5rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-foreground)",
                        fontWeight: "500",
                      }}
                    >
                      Género
                    </th>
                    <th
                      style={{
                        padding: "1rem 1.5rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-foreground)",
                        fontWeight: "500",
                      }}
                    >
                      Talla
                    </th>
                    <th
                      style={{
                        padding: "1rem 1.5rem",
                        textAlign: "right",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-foreground)",
                        fontWeight: "500",
                      }}
                    >
                      Ventas
                    </th>
                    <th
                      style={{
                        padding: "1rem 1.5rem",
                        textAlign: "right",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-foreground)",
                        fontWeight: "500",
                      }}
                    >
                      Rotación
                    </th>
                    <th
                      style={{
                        padding: "1rem 1.5rem",
                        textAlign: "center",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-foreground)",
                        fontWeight: "500",
                      }}
                    >
                      Tendencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s ease" }}
                    >
                      <td style={{ padding: "1rem 1.5rem", fontWeight: "300", color: "var(--foreground)" }}>
                        {item.product}
                      </td>
                      <td style={{ padding: "1rem 1.5rem", color: "var(--foreground)", fontSize: "0.875rem" }}>
                        {item.gender}
                      </td>
                      <td style={{ padding: "1rem 1.5rem", color: "var(--foreground)", fontSize: "0.875rem" }}>
                        {item.size}
                      </td>
                      <td
                        style={{
                          padding: "1rem 1.5rem",
                          textAlign: "right",
                          color: "var(--foreground)",
                          fontWeight: "300",
                        }}
                      >
                        {item.sales}
                      </td>
                      <td
                        style={{
                          padding: "1rem 1.5rem",
                          textAlign: "right",
                          color: "var(--primary)",
                          fontWeight: "500",
                        }}
                      >
                        {item.rotation}x
                      </td>
                      <td style={{ padding: "1rem 1.5rem", textAlign: "center" }}>
                        {item.trend === "up" ? (
                          <TrendingUp
                            style={{ display: "inline", width: "1rem", height: "1rem", color: "var(--primary)" }}
                          />
                        ) : (
                          <TrendingDown
                            style={{ display: "inline", width: "1rem", height: "1rem", color: "var(--destructive)" }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

