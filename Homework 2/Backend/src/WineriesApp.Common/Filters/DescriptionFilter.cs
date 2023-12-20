namespace WineriesApp.Common.Filters;

public class DescriptionFilter : IFilter<string>
{
    public string Execute(string input)
    {
        var fields = input.Split(',');

        fields[9] = fields[9].Replace("\"", "");
        
        return string.Join(",", fields);
    }
}