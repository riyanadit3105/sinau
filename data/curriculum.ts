import { BookOpen, Gamepad2, Star } from "lucide-react";

// =========================================================
// 🟢 DATA KELAS 1
// =========================================================
const grade1 = [
  // --- BAB 1: Numbers to 10 ---
  {
    id: "bab-1",
    title: "Bilangan 1 sampai 10", // Numbers to 10
    themeColor: "bg-gradient-to-br from-sky-400 to-blue-500",
    levels: [
      {
        id: "1-1",
        title: "Menghitung Kumpulan Benda", // Counting sets of objects
        xp: 100,
        segments: [
          // ... (Segmen Slide & Game yang Anda buat sebelumnya) ...
          {
            type: "material",
            title: "Angka Sebagai Label",
            character: "pak_budi",
            emotion: "happy",
            dialogue: "Halo! Angka ada di mana-mana lho. Kadang angka cuma jadi 'Label' atau nama, seperti nomor di punggung pemain bola ini.",
            visual: { type: "image", src: "/images/nomor_punggung.jpg", mode: "simple" }
          },
          {
            type: "material",
            title: "Angka Sebagai Jumlah",
            character: "pak_budi",
            emotion: "explaining",
            dialogue: "Tapi, kita biasanya pakai angka untuk menghitung 'Jumlah'. Contohnya, hitung ada berapa kado di kotak ini?",
            visual: { type: "grid", icon: "gift", count: 2, color: "text-blue-500", mode: "total" }
          },
          {
            type: "material",
            title: "Urutan Menghitung",
            character: "pak_budi",
            emotion: "happy",
            dialogue: "Supaya tidak salah, kita harus menghitung secara urut. Mulai dari 1, 2, 3, dan seterusnya untuk setiap benda.",
            visual: { type: "grid", icon: "apple", count: 10, color: "text-red-500", mode: "total" }
          },
          {
            type: "material",
            title: "Rangkuman Angka",
            character: "pak_budi",
            emotion: "happy",
            dialogue: "Luar biasa! Mari kita lihat semua angka yang sudah kita pelajari, dari 1 sampai 10.",
            visual: {
               type: "summary",
               items: [
                 { count: 1, icon: "banana", color: "text-yellow-500" },
                 { count: 2, icon: "gift",   color: "text-pink-500" },
                 { count: 3, icon: "apple",  color: "text-red-500" },
                 { count: 4, icon: "car",    color: "text-blue-500" },
                 { count: 5, icon: "star",   color: "text-orange-400" },
                 { count: 6, icon: "book",   color: "text-green-600" },
                 { count: 7, icon: "rocket", color: "text-purple-500" },
                 { count: 8, icon: "ball",   color: "text-teal-500" },
                 { count: 9, icon: "hat",    color: "text-indigo-600" },
                 { count: 10, icon: "cat",   color: "text-slate-600" } 
               ]
            }
          },
          {
            type: "game_guess", 
            title: "Misi Hitung Benda",
            config: { bgTheme: "bg-indigo-600", objects: ["apple", "car", "star", "rocket", "book"] }
          },
          {
            type: "game_drag_drop", 
            title: "Misi Keranjang",
            config: { difficulty: "easy" }
          }
        ]
      },
      {
        id: "1-2",
        title: "Membaca & Menulis Angka 1-10", // Say, read and write numbers to 10
        xp: 150,
        segments: [
        ]
      },
      {
        id: "1-3",
        title: "Membandingkan Bilangan", // Comparing numbers
        xp: 150,
        segments: []
      },
      {
        id: "1-4",
        title: "Kata Bilangan (Satu, Dua...)", // Number words
        xp: 100,
        segments: []
      },
      {
        id: "1-5",
        title: "Ganjil dan Genap", // Odd and even numbers
        xp: 150,
        segments: []
      }
    ]
  },

  // --- BAB 2: Geometry ---
  {
    id: "bab-2",
    title: "Geometri Dasar", // Geometry
    themeColor: "bg-gradient-to-br from-emerald-400 to-green-600",
    levels: [
      { id: "2-1", title: "Bangun Ruang (3D)", xp: 150, segments: [] }, // 3D shapes
      { id: "2-2", title: "Bangun Datar (2D)", xp: 150, segments: [] }  // 2D shapes
    ]
  },

  // --- BAB 3: Fractions ---
  {
    id: "bab-3",
    title: "Pecahan", // Fractions
    themeColor: "bg-gradient-to-br from-violet-400 to-purple-600",
    levels: [
      { id: "3-1", title: "Pengenalan Pecahan", xp: 150, segments: [] } // Fractions
    ]
  },

  // --- BAB 4: Measures ---
  {
    id: "bab-4",
    title: "Pengukuran", // Measures
    themeColor: "bg-gradient-to-br from-amber-400 to-orange-500",
    levels: [
      { id: "4-1", title: "Panjang (Length)", xp: 150, segments: [] } // Length
    ]
  },

  // --- BAB 5: Working with numbers to 10 ---
  {
    id: "bab-5",
    title: "Operasi Hitung (1-10)", // Working with numbers to 10
    themeColor: "bg-gradient-to-br from-rose-400 to-red-600",
    levels: [
      { id: "5-1", title: "Penjumlahan (Menggabungkan)", xp: 200, segments: [] }, // Addition as combining
      { id: "5-2", title: "Pengurangan (Mengambil)", xp: 200, segments: [] }     // Subtraction as take away
    ]
  },

  // --- BAB 6: Position ---
  {
    id: "bab-6",
    title: "Posisi", // Position
    themeColor: "bg-gradient-to-br from-cyan-400 to-teal-500",
    levels: [
      { id: "6-1", title: "Mengenal Posisi", xp: 100, segments: [] } // Position
    ]
  },

  // --- BAB 7: Statistics ---
  {
    id: "bab-7",
    title: "Statistik Data", // Statistics
    themeColor: "bg-gradient-to-br from-fuchsia-400 to-pink-600",
    levels: [
      { id: "7-1", title: "Himpunan (Sets)", xp: 150, segments: [] },      // Sets
      { id: "7-2", title: "Diagram Venn", xp: 200, segments: [] }          // Venn diagrams
    ]
  },

  // --- BAB 8: Time ---
  {
    id: "bab-8",
    title: "Waktu", // Time
    themeColor: "bg-gradient-to-br from-yellow-400 to-amber-500",
    levels: [
      { id: "8-1", title: "Mengenal Waktu", xp: 150, segments: [] } // Time
    ]
  },

  // --- BAB 9: Numbers to 20 ---
  {
    id: "bab-9",
    title: "Bilangan sampai 20", // Numbers to 20
    themeColor: "bg-gradient-to-br from-indigo-400 to-blue-700",
    levels: [
      { id: "9-1", title: "Menghitung sampai 20", xp: 150, segments: [] }, // Counting to 20
      { id: "9-2", title: "Membandingkan & Mengurutkan", xp: 200, segments: [] }, // Counting, comparing, ordering...
      { id: "9-3", title: "Pola Bilangan", xp: 200, segments: [] } // Number patterns
    ]
  },

  // --- BAB 10: Geometry (2) ---
  {
    id: "bab-10",
    title: "Geometri Lanjutan", // Geometry (2)
    themeColor: "bg-gradient-to-br from-lime-400 to-green-600",
    levels: [
      { id: "10-1", title: "Bangun Ruang (Lanjutan)", xp: 200, segments: [] }, // 3D shapes
      { id: "10-2", title: "Bangun Datar (Lanjutan)", xp: 200, segments: [] }  // 2D shapes
    ]
  }
];

const grade2 = [{}];

const grade3 = [{}];

const grade4 = [{}];

const grade5 = [{}];

// =========================================================
// 🔵 DATA KELAS 6 (PLACEHOLDER UNTUK MASA DEPAN)
// =========================================================
const grade6 = [
  // --- BAB 1: The number system ---
  {
    id: "bab-1",
    title: "Sistem Bilangan", // The number system
    themeColor: "bg-gradient-to-r from-blue-600 to-indigo-700",
    levels: [
      {
        id: "1-1",
        title: "Nilai Tempat", // Place value
        xp: 100,
        segments: [
          // --- SEGMENT 1: REAL WORLD CONTEXT (HOOK) ---
          {
            type: "material",
            title: "Kupu-kupu Terkecil",
            character: "pak_budi",
            emotion: "surprised",
            dialogue: "Halo Kelas 6! Tahukah kamu? Kupu-kupu 'Western Pygmy Blue' sangat kecil. Lebar sayapnya hanya 0.375 inci!", // Referensi: 0.375 inches
            visual: { 
                type: "image", 
                src: "/images/kupu-kupu.jpg",
                caption: "Lebar sayap: 0.375 inci"
            }
          },

          {
            type: "material",
            title: "Transformasi Pecahan",
            character: "pak_budi",
            emotion: "explaining",
            dialogue: "Lihat keajaiban ini! Setengah batang cokelat (1/2) ternyata isinya sama persis dengan lima kotak kecil persepuluhan. Inilah kenapa 1/2 sama dengan 0.5.",
            visual: {
                type: "animation_fraction_decimal",
                fraction: "1/2",
                decimal: "0.5",
                color: "bg-amber-800" // Bisa ganti warna: bg-red-500, bg-green-500, dll.
            }
          },

          // --- SEGMENT 2: CONCEPT (DECIMAL PLACES) ---
          {
            type: "material",
            title: "Mengenal Nilai Tempat",
            character: "pak_budi",
            emotion: "explaining",
            dialogue: "Angka 26.375 memiliki 3 tempat desimal. Mari kita bedah nilainya: 2 adalah puluhan, 6 adalah satuan, 3 adalah persepuluhan, 7 perseratusan, dan 5 perseribu.", // Referensi: value of each digit, tenths, hundredths, thousandths
            visual: { 
                type: "chart_place_value", // Tipe visual custom untuk tabel nilai tempat
                data: {
                    tens: 2,
                    ones: 6,
                    tenths: 3,
                    hundredths: 7,
                    thousandths: 5
                },
                highlight: ["tenths", "hundredths", "thousandths"]
            }
          },

          // --- SEGMENT 3: CONCEPT (DECOMPOSE) ---
          {
            type: "material",
            title: "Mengurai Bilangan (Decompose)",
            character: "pak_budi",
            emotion: "happy",
            dialogue: "Kita bisa mengurai (decompose) angka 26.375 menjadi penjumlahan: 20 + 6 + 0.3 + 0.07 + 0.005. Ini disebut 'Value of Digits'.", // Referensi: decompose numbers
            visual: { 
                type: "equation", 
                content: "26.375 = 20 + 6 + 0.3 + 0.07 + 0.005",
                color: "text-indigo-600"
            }
          },

           // --- SEGMENT 5: CONCEPT (MULTIPLY BY 10/100/1000) ---
           {
            type: "material",
            title: "Perkalian 10, 100, 1000",
            character: "pak_budi",
            emotion: "excited",
            dialogue: "Bagaimana jika kita gabungkan Puluhan, Satuan, dan Pecahan Desimal? Lihat animasinya.", // Referensi: multiply by 10, 100 and 1000
            visual: { 
                type: "animation_shift_decimal", 
                data: {
                    tens: 20,
                    ones: 5,
                    tenths: 0.3,
                    hundredths: 0.04,
                    thousandths: 0.005
                },
            }
          },
          {
            type: "game_fill_blank",
            title: "Tantangan Dekomposisi", // Judul di header
            xp: 3
          },
          {
            type: "game_sorting",
            title: "Grand Prix Desimal",
            xp: 20
          }
        ]
      },
      {
        id: "1-2",
        title: "Pembulatan Desimal", // Rounding decimal numbers
        xp: 100,
        segments: []
      }
    ]
  },

  // --- BAB 2: Numbers and sequences ---
  {
    id: "bab-2",
    title: "Angka dan Urutan", // Numbers and sequences
    themeColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    levels: [
      { id: "2-1", title: "Berhitung & Barisan", xp: 150, segments: [] }, // Counting and sequences
      { id: "2-2", title: "Bilangan Spesial", xp: 150, segments: [] },    // Special numbers
      { id: "2-3", title: "KPK dan FPB", xp: 150, segments: [] }          // Common multiples and factors
    ]
  },

  // --- BAB 3: Averages ---
  {
    id: "bab-3",
    title: "Pengolahan Data (Rata-rata)", // Averages
    themeColor: "bg-gradient-to-r from-emerald-500 to-green-600",
    levels: [
      { id: "3-1", title: "Modus, Median, Mean & Range", xp: 200, segments: [] } // Mode, median, mean and range
    ]
  },

  // --- BAB 4: Addition and subtraction (1) ---
  {
    id: "bab-4",
    title: "Penjumlahan & Pengurangan (1)", // Addition and subtraction (1)
    themeColor: "bg-gradient-to-r from-orange-500 to-red-600",
    levels: [
      { id: "4-1", title: "Bilangan Bulat Positif & Negatif", xp: 150, segments: [] }, // Positive and negative integers
      { id: "4-2", title: "Menggunakan Huruf (Aljabar Dasar)", xp: 200, segments: [] } // Using letters to represent numbers
    ]
  },

  // --- BAB 5: 2D shapes ---
  {
    id: "bab-5",
    title: "Bangun Datar (2D)", // 2D shapes
    themeColor: "bg-gradient-to-r from-purple-500 to-fuchsia-600",
    levels: [
      { id: "5-1", title: "Segi Empat (Quadrilaterals)", xp: 150, segments: [] }, // Quadrilaterals
      { id: "5-2", title: "Lingkaran", xp: 150, segments: [] },                   // Circles
      { id: "5-3", title: "Simetri Putar", xp: 150, segments: [] }                // Rotational symmetry
    ]
  },

  // --- BAB 6: Fractions and percentages ---
  {
    id: "bab-6",
    title: "Pecahan & Persentase", // Fractions and percentages
    themeColor: "bg-gradient-to-r from-pink-500 to-rose-600",
    levels: [
      { id: "6-1", title: "Memahami Pecahan", xp: 150, segments: [] },      // Understanding fractions
      { id: "6-2", title: "Persentase", xp: 150, segments: [] },            // Percentages
      { id: "6-3", title: "Kesetaraan & Perbandingan", xp: 150, segments: [] } // Equivalence and comparison
    ]
  },

  // --- BAB 7: Exploring measures ---
  {
    id: "bab-7",
    title: "Pengukuran", // Exploring measures
    themeColor: "bg-gradient-to-r from-yellow-500 to-amber-600",
    levels: [
      { id: "7-1", title: "Persegi Panjang & Segitiga", xp: 150, segments: [] }, // Rectangles and triangles
      { id: "7-2", title: "Waktu", xp: 100, segments: [] }                      // Time
    ]
  },

  // --- BAB 8: Addition and subtraction (2) ---
  {
    id: "bab-8",
    title: "Penjumlahan & Pengurangan (2)", // Addition and subtraction (2)
    themeColor: "bg-gradient-to-r from-teal-500 to-emerald-600",
    levels: [
      { id: "8-1", title: "Operasi Desimal", xp: 200, segments: [] }, // Adding and subtracting decimal numbers
      { id: "8-2", title: "Operasi Pecahan", xp: 200, segments: [] }  // Adding and subtracting fractions
    ]
  },

  // --- BAB 9: Probability ---
  {
    id: "bab-9",
    title: "Peluang (Probability)", // Probability
    themeColor: "bg-gradient-to-r from-indigo-500 to-violet-600",
    levels: [
      { id: "9-1", title: "Memprediksi Kemungkinan", xp: 150, segments: [] } // Describing and predicting likelihood
    ]
  },

  // --- BAB 10: Multiplication and division (1) ---
  {
    id: "bab-10",
    title: "Perkalian & Pembagian", // Multiplication and division (1)
    themeColor: "bg-gradient-to-r from-red-500 to-orange-600",
    levels: [
      { id: "10-1", title: "Perkalian", xp: 150, segments: [] },        // Multiplication
      { id: "10-2", title: "Pembagian", xp: 150, segments: [] },        // Division
      { id: "10-3", title: "Uji Keterbagian", xp: 200, segments: [] }   // Tests of divisibility
    ]
  },

  // --- BAB 11: 3D shapes ---
  {
    id: "bab-11",
    title: "Bangun Ruang (3D)", // 3D shapes
    themeColor: "bg-gradient-to-r from-lime-500 to-green-600",
    levels: [
      { id: "11-1", title: "Jaring-jaring Bangun Ruang", xp: 200, segments: [] }, // Shapes and nets
      { id: "11-2", title: "Kapasitas & Volume", xp: 200, segments: [] }          // Capacity and volume
    ]
  },

  // --- BAB 12: Ratio and proportion ---
  {
    id: "bab-12",
    title: "Rasio & Proporsi", // Ratio and proportion
    themeColor: "bg-gradient-to-r from-sky-500 to-blue-600",
    levels: [
      { id: "12-1", title: "Rasio", xp: 150, segments: [] },            // Ratio
      { id: "12-2", title: "Proporsi Langsung", xp: 200, segments: [] } // Direct proportion
    ]
  },

  // --- BAB 13: Angles ---
  {
    id: "bab-13",
    title: "Sudut", // Angles
    themeColor: "bg-gradient-to-r from-fuchsia-500 to-purple-600",
    levels: [
      { id: "13-1", title: "Mengukur & Menggambar Sudut", xp: 150, segments: [] }, // Measuring and drawing angles
      { id: "13-2", title: "Sudut dalam Segitiga", xp: 200, segments: [] }         // Angles in a triangle
    ]
  }
];

// =========================================================
// 🎛️ SYSTEM SCALABILITY (PENGATUR KELAS)
// =========================================================

export const curriculumMap: Record<string, any[]> = {
    "1": grade1,
    "2": grade2,
    "3": grade3,
    "4": grade4,
    "5": grade5,
    "6": grade6,
    // Tambahkan kelas lain di sini nanti: "2": grade2, dst.
};
