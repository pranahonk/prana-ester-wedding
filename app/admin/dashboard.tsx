"use client";

import { useEffect, useState, useMemo } from "react";

interface RSVP {
  id: number;
  name: string;
  phone: string | null;
  attendance: string;
  guests: number;
  created_at: string;
}

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

type SortField = "name" | "attendance" | "guests" | "created_at";
type SortDir = "asc" | "desc";

export default function Dashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "hadir" | "tidak">("all");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/rsvp").then((r) => r.json()),
      fetch("/api/wishes").then((r) => r.json()),
    ]).then(([rsvpData, wishData]) => {
      setRsvps(Array.isArray(rsvpData) ? rsvpData : []);
      setWishes(Array.isArray(wishData) ? wishData : []);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filteredRsvps = useMemo(() => {
    let result = [...rsvps];

    if (filter === "hadir") {
      result = result.filter((r) => r.attendance === "hadir");
    } else if (filter === "tidak") {
      result = result.filter((r) => r.attendance === "tidak hadir");
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.phone && r.phone.includes(q))
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") {
        cmp = a.name.localeCompare(b.name);
      } else if (sortField === "attendance") {
        cmp = a.attendance.localeCompare(b.attendance);
      } else if (sortField === "guests") {
        cmp = a.guests - b.guests;
      } else {
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [rsvps, filter, search, sortField, sortDir]);

  const stats = useMemo(() => {
    const total = rsvps.length;
    const confirmed = rsvps.filter((r) => r.attendance === "hadir").length;
    const declined = rsvps.filter((r) => r.attendance === "tidak hadir").length;
    const totalGuests = rsvps
      .filter((r) => r.attendance === "hadir")
      .reduce((sum, r) => sum + r.guests, 0);
    return { total, confirmed, declined, totalGuests };
  }, [rsvps]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-gray-400 ml-1">↕</span>;
    return <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">RSVP Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card label="Total RSVPs" value={stats.total} color="blue" />
        <Card label="Confirmed" value={stats.confirmed} color="green" />
        <Card label="Declined" value={stats.declined} color="red" />
        <Card label="Total Guests" value={stats.totalGuests} color="purple" />
      </div>

      {/* RSVP Table */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">RSVPs</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="hadir">Hadir</option>
              <option value="tidak">Tidak Hadir</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-3 font-medium">#</th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:text-gray-900 select-none"
                  onClick={() => handleSort("name")}
                >
                  Name <SortIcon field="name" />
                </th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:text-gray-900 select-none"
                  onClick={() => handleSort("attendance")}
                >
                  Attendance <SortIcon field="attendance" />
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:text-gray-900 select-none"
                  onClick={() => handleSort("guests")}
                >
                  Guests <SortIcon field="guests" />
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:text-gray-900 select-none"
                  onClick={() => handleSort("created_at")}
                >
                  Date <SortIcon field="created_at" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRsvps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No RSVPs found
                  </td>
                </tr>
              ) : (
                filteredRsvps.map((rsvp, i) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{rsvp.name}</td>
                    <td className="px-4 py-3 text-gray-600">{rsvp.phone || "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          rsvp.attendance === "hadir"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {rsvp.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{rsvp.guests}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(rsvp.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredRsvps.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 text-sm text-gray-500">
            Showing {filteredRsvps.length} of {rsvps.length} RSVPs
          </div>
        )}
      </div>

      {/* Wishes */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Wishes ({wishes.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {wishes.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-400">No wishes yet</div>
          ) : (
            wishes.map((wish) => (
              <div key={wish.id} className="px-4 py-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-medium text-gray-900">{wish.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(wish.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{wish.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "green" | "red" | "purple";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className={`rounded-lg border p-4 ${colors[color]}`}>
      <p className="text-sm opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
