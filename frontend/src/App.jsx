import { useEffect, useState } from "react"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"

import GlobalNav from "@/components/GlobalNav"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/context/ThemeContext"
import LandingPage from "@/pages/LandingPage"
import LoginPage from "@/pages/LoginPage"
import PropertyDetailPage from "@/pages/PropertyDetailPage"
import PropertyListPage from "@/pages/PropertyListPage"
import { PROPERTIES } from "@/data/properties"

// API 연동 전 목데이터 로딩 시뮬레이션 시간(ms)
const MOCK_LOADING_MS = 600

function DetailRoute({ loading, properties, memos, onToggleSave, memoActions }) {
  const { id: idParam } = useParams()
  const navigate = useNavigate()
  const id = Number(idParam)
  const property = properties.find((p) => p.id === id) ?? null

  return (
    <PropertyDetailPage
      property={property}
      loading={loading}
      onBack={() => navigate("/properties")}
      onToggleSave={onToggleSave}
      memos={memos[id] ?? []}
      onAddMemo={(text) => memoActions.add(id, text)}
      onUpdateMemo={(memoId, text) => memoActions.update(id, memoId, text)}
      onDeleteMemo={(memoId) => memoActions.remove(id, memoId)}
    />
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const [memos, setMemos] = useState({}) // { [propertyId]: [{ id, text, createdAt }] }
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setProperties(PROPERTIES)
      setLoading(false)
    }, MOCK_LOADING_MS)
    return () => clearTimeout(timer)
  }, [])

  // PROP-04·05 매물 저장·저장 취소
  const toggleSave = (id) =>
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p))
    )

  // MEMO-01~03 메모 작성·수정·삭제
  const memoActions = {
    add: (propertyId, text) =>
      setMemos((prev) => ({
        ...prev,
        [propertyId]: [
          ...(prev[propertyId] ?? []),
          { id: Date.now(), text, createdAt: new Date().toISOString() },
        ],
      })),
    update: (propertyId, memoId, text) =>
      setMemos((prev) => ({
        ...prev,
        [propertyId]: prev[propertyId].map((m) =>
          m.id === memoId ? { ...m, text } : m
        ),
      })),
    remove: (propertyId, memoId) =>
      setMemos((prev) => ({
        ...prev,
        [propertyId]: prev[propertyId].filter((m) => m.id !== memoId),
      })),
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalNav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/properties"
            element={
              <PropertyListPage
                loading={loading}
                properties={properties}
                onToggleSave={toggleSave}
                onOpen={(id) => navigate(`/properties/${id}`)}
              />
            }
          />
          <Route
            path="/properties/:id"
            element={
              <DetailRoute
                loading={loading}
                properties={properties}
                memos={memos}
                onToggleSave={toggleSave}
                memoActions={memoActions}
              />
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
