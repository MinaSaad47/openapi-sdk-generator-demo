using System.Text.Json.Serialization;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(Student), "student")]
[JsonDerivedType(typeof(Teacher), "teacher")]
public abstract record User
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
    public required string Email { get; init; }
}

public record Student : User
{
    public required decimal GPA { get; init; }
    public required string Major { get; init; }
}

public record Teacher : User
{
    public required string Department { get; init; }
    public required int YearsOfExperience { get; init; }
}
