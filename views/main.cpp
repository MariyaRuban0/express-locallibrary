#include <iostream>
#include <fstream>
#include <iomanip>
#include <vector>

class Funktsiya {
private:
    double* x; // абсциса
    double* y; // ордината
    int size;

public:
    Funktsiya() {
        x = nullptr;
        y = nullptr;
        size = 0;
    }

    ~Funktsiya() {
        delete[] x;
        delete[] y;
    }

    void vyluchennya(const std::string& filename, int column) {
        std::ifstream file(filename);
        if (!file) {
            std::cerr << "Не вдалося відкрити файл!\n";
            return;
        }

        std::vector<double> tempX, tempY;
        double val1, val2, val3;

        while (file >> val1 >> val2 >> val3) {
            tempX.push_back(val1);
            if (column == 2)
                tempY.push_back(val2);
            else
                tempY.push_back(val3);
        }

        size = tempX.size();
        x = new double[size];
        y = new double[size];

        for (int i = 0; i < size; i++) {
            x[i] = tempX[i];
            y[i] = tempY[i];
        }

        file.close();
    }

    void vstavka() {
        std::cout << "\nX\tY\n";
        for (int i = 0; i < size; i++) {
            std::cout << x[i] << "\t" << y[i] << "\n";
        }
    }

    void pokazatyGrafik() {
        std::cout << "\nГрафік функції (X | Y -> *):\n";
        for (int i = 0; i < size; i++) {
            std::cout << std::setw(3) << x[i] << " | ";
            int k = static_cast<int>(y[i]); // для простоти
            for (int j = 0; j < k; j++)
                std::cout << "*";
            std::cout << "\n";
        }
    }

    void zapisZFormatom(const std::string& filenameOut) {
        std::ofstream fout(filenameOut);
        fout << std::fixed << std::setprecision(3);

        for (int i = 0; i < size; ++i) {
            fout << std::setw(10) << std::showpos << x[i] << "\t"
                 << std::setw(10) << std::showpos << y[i] << "\n";
        }

        fout.close();
    }

    friend void znajtyMinMax(Funktsiya& f);
};

void znajtyMinMax(Funktsiya& f) {
    if (f.size == 0) return;

    double min = f.y[0], max = f.y[0];
    for (int i = 1; i < f.size; i++) {
        if (f.y[i] < min) min = f.y[i];
        if (f.y[i] > max) max = f.y[i];
    }

    std::cout << "Мінімум Y: " << min << ", Максимум Y: " << max << "\n";
}

int main() {
    Funktsiya f1, f2;

    // Зчитування з файлу для двох функцій
    f1.vyluchennya("data.txt", 2); // друга колонка — перша функція
    f2.vyluchennya("data.txt", 3); // третя колонка — друга функція

    std::cout << "\nПЕРША ФУНКЦІЯ:\n";
    f1.vstavka();
    f1.pokazatyGrafik();
    znajtyMinMax(f1);
    f1.zapisZFormatom("output1.txt");

    std::cout << "\nДРУГА ФУНКЦІЯ:\n";
    f2.vstavka();
    f2.pokazatyGrafik();
    znajtyMinMax(f2);
    f2.zapisZFormatom("output2.txt");

    return 0;
}

