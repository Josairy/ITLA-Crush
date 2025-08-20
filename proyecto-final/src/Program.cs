using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("✅ Tu entorno C# en VS Code está funcionando.");
        Console.WriteLine("Escribe tu nombre:");
        string nombre = Console.ReadLine();
        Console.WriteLine($"Hola, {nombre}! 🚀 Bienvenido a C# en .NET {Environment.Version}");
    }
}