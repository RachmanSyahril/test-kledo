import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import type { RegionData } from './types';

export function RegionFilter() {
  const data = useLoaderData() as RegionData;

  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedRegency, setSelectedRegency] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedProvince = localStorage.getItem('province');
    const savedRegency = localStorage.getItem('regency');
    const savedDistrict = localStorage.getItem('district');

    if (savedProvince) setSelectedProvince(savedProvince);
    if (savedRegency) setSelectedRegency(savedRegency);
    if (savedDistrict) setSelectedDistrict(savedDistrict);
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    if (selectedProvince) {
      localStorage.setItem('province', selectedProvince);
    } else {
      localStorage.removeItem('province');
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency) {
      localStorage.setItem('regency', selectedRegency);
    } else {
      localStorage.removeItem('regency');
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      localStorage.setItem('district', selectedDistrict);
    } else {
      localStorage.removeItem('district');
    }
  }, [selectedDistrict]);

  // Get display names
  const provinceName = data.provinces.find(p => p.id.toString() === selectedProvince)?.name || '';
  const regencyName = data.regencies.find(r => r.id.toString() === selectedRegency)?.name || '';
  const districtName = data.districts.find(d => d.id.toString() === selectedDistrict)?.name || '';

  // Filter regencies by selected province
  const filteredRegencies = selectedProvince
    ? data.regencies.filter(r => r.province_id.toString() === selectedProvince)
    : [];

  // Filter districts by selected regency
  const filteredDistricts = selectedRegency
    ? data.districts.filter(d => d.regency_id.toString() === selectedRegency)
    : [];

  // Handle province change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedProvince(value);
    setSelectedRegency('');
    setSelectedDistrict('');
  };

  // Handle regency change
  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRegency(value);
    setSelectedDistrict('');
  };

  // Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  // Handle reset
  const handleReset = () => {
    setSelectedProvince('');
    setSelectedRegency('');
    setSelectedDistrict('');
    localStorage.removeItem('province');
    localStorage.removeItem('regency');
    localStorage.removeItem('district');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Frontend Assessment</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Filter Wilayah</h2>

          {/* Province */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Provinsi
            </label>
            <div className="relative">
              <select
                name="province"
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih Provinsi</option>
                {data.provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Regency */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Kota/Kabupaten
            </label>
            <div className="relative">
              <select
                name="regency"
                value={selectedRegency}
                onChange={handleRegencyChange}
                disabled={!selectedProvince}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {filteredRegencies.map((regency) => (
                  <option key={regency.id} value={regency.id}>
                    {regency.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* District */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Kecamatan
            </label>
            <div className="relative">
              <select
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedRegency}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">Pilih Kecamatan</option>
                {filteredDistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full border border-blue-600 text-blue-600 rounded-lg px-4 py-3 text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span className="text-gray-400">Indonesia</span>
          {provinceName && (
            <>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400">{provinceName}</span>
            </>
          )}
          {regencyName && (
            <>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400">{regencyName}</span>
            </>
          )}
          {districtName && (
            <>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-600 font-medium">{districtName}</span>
            </>
          )}
        </nav>

        {/* Content Display */}
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* Province Display */}
          {provinceName && (
            <div>
              <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Provinsi</h3>
              <h2 className="text-4xl font-bold text-gray-900">{provinceName}</h2>
              <div className="mt-6 flex justify-center">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}

          {/* Regency Display */}
          {regencyName && (
            <div>
              <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Kota / Kabupaten</h3>
              <h2 className="text-4xl font-bold text-gray-900">{regencyName}</h2>
              <div className="mt-6 flex justify-center">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}

          {/* District Display */}
          {districtName && (
            <div>
              <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Kecamatan</h3>
              <h2 className="text-4xl font-bold text-gray-900">{districtName}</h2>
            </div>
          )}

          {/* Empty State */}
          {!provinceName && !regencyName && !districtName && (
            <div className="py-20">
              <p className="text-gray-400 text-lg">Pilih wilayah untuk melihat detail</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
