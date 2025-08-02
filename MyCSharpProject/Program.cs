using System;

class Program
{
    static void Main()
    {
        int[] numbers = { -4, -3, -2, -1, 0, 1, 2, 3, 4, 5 };
        int targetSum = 7;

        FindTriplets(numbers, targetSum);
    }

    static void FindTriplets(int[] arr, int targetSum)
    {
        int n = arr.Length;
        bool foundTriplet = false;

        // Sort the array to make it easier to find triplets
        Array.Sort(arr);

        for (int i = 0; i < n - 2; i++)
        {
            for (int j = i + 1; j < n - 1; j++)
            {
                for (int k = j + 1; k < n; k++)
                {
                    if (arr[i] + arr[j] + arr[k] == targetSum)
                    {
                        Console.WriteLine($"Triplet found:```csharp{arr[i]}, {arr[j]}, {arr[k]}");
        foundTriplet = true;
    }
   }
  }
 }

 if (!foundTriplet)
 {
  Console.WriteLine("No triplet found that sums to " + targetSum);
 }
 }
}
