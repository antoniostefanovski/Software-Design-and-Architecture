namespace WineriesApp.Services.Filters
{
    public interface IFilter<T>
    {
        T Execute(T input);
    }
}