import React, { useState } from 'react';
import { Calendar, Filter, Download, Search, ChevronLeft, ChevronRight, Check, AlertTriangle, Film, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for detection history
const mockHistory = Array.from({ length: 20 }, (_, i) => ({
  id: `det_${100000 + i}`,
  filename: i % 3 === 0 ? `video_${i}.mp4` : `image_${i}.jpg`,
  type: i % 3 === 0 ? 'video' : 'image',
  date: new Date(Date.now() - i * 86400000 * (1 + Math.floor(Math.random() * 5))).toISOString(),
  isDeepfake: i % 4 === 0 || i % 7 === 0,
  confidence: 70 + Math.floor(Math.random() * 30)
}));

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'deepfake' | 'authentic'>('all');
  
  const itemsPerPage = 10;
  
  // Filter the history based on search term and filter
  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'deepfake' && item.isDeepfake) || 
      (filter === 'authentic' && !item.isDeepfake);
      
    return matchesSearch && matchesFilter;
  });
  
  // Paginate the filtered results
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Detection History</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('deepfake')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'deepfake' 
                ? 'bg-error-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Deepfakes
          </button>
          <button
            onClick={() => setFilter('authentic')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'authentic' 
                ? 'bg-success-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Authentic
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr 
                  key={item.id}
                  className={index !== currentItems.length - 1 ? 'border-b border-gray-200' : ''}
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 mr-3 rounded-lg bg-gray-100">
                        {item.type === 'video' ? (
                          <Film size={16} className="text-gray-600" />
                        ) : (
                          <Image size={16} className="text-gray-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{item.filename}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${
                      item.isDeepfake 
                        ? 'bg-error-100 text-error-900' 
                        : 'bg-success-100 text-success-900'
                    }`}>
                      {item.isDeepfake ? (
                        <>
                          <AlertTriangle size={12} className="mr-1" />
                          Deepfake
                        </>
                      ) : (
                        <>
                          <Check size={12} className="mr-1" />
                          Authentic
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-full rounded-full ${
                            item.isDeepfake ? 'bg-error-500' : 'bg-success-500'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span 
                        className={item.isDeepfake ? 'text-error-500' : 'text-success-500'}
                      >
                        {item.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                        title="Download Report"
                      >
                        <Download size={18} />
                      </button>
                      <Link 
                        to={`/detection/${item.id}`}
                        className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No detection history found. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredHistory.length)} of {filteredHistory.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-md ${
                  page === currentPage 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;